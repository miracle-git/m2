/**
 * @file DataFetch(内部调用)
 * @description 基于axios封装的数据请求类
 */
import axios from 'axios'
import qs from 'qs'
import { DEFAULT_FETCH_OPTIONS, REQUEST_METHOD, CONTENT_TYPE, EMPTY_OBJECT, EMPTY_FUNC, EMPTY_ARRAY } from '../constants'
import { DataType } from './data-type'
import { DataStorage } from './data-storage'
import { DataEnv, IsDev, cacheEnvKeys, getBuildEnv } from './data-env'
import { DataUtil } from './data-util'

const _parseBaseUrl = (baseUrl, env, proxy, apiKey = '') => {
  if (baseUrl) return baseUrl
  if ((IsDev && proxy) || !env) return ''
  let apiUrl = ''
  const _buildEnv = getBuildEnv()
  const _cacheKey = cacheEnvKeys.url

  if (!IsDev && !apiKey) {
    apiUrl = DataStorage.get(_cacheKey)
    if (apiUrl) return apiUrl
  }

  for (let prop in env) {
    const currentEnv = { ...(DataEnv[prop] || { env: prop, alias: prop }), ...env[prop] }
    if (currentEnv.env === _buildEnv || currentEnv.alias === _buildEnv) {
      if (DataType.isString(currentEnv.api)) {
        apiUrl = currentEnv.api
      } else if (DataType.isObject(currentEnv.api)) {
        apiUrl = currentEnv.api[apiKey]
      }
      if (apiUrl) {
        !IsDev && DataStorage.set(_cacheKey, apiUrl)
      }
      break
    }
  }

  return apiUrl
}

const _configInterceptor = (retry, retryDelay, { instance = axios, request = EMPTY_FUNC, response = EMPTY_FUNC, reject = EMPTY_FUNC} = EMPTY_OBJECT) => {
  if (!DataType.isEmptyFunction(request)) {
    instance.interceptors.request.use(request)
  }
  if (!DataType.isEmptyFunction(response)) {
    instance.interceptors.response.use(response, reject)
  }

  if (retry <= 0) return instance

  instance.defaults.retry = retry
  instance.defaults.retryDelay = retryDelay

  instance.interceptors.response.use(undefined, (err) => {
    const config = err.config
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) {
      return Promise.reject(err)
    }
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0
    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      err.failure = true
      err.message = `Retry ${config.retry} times, the request has been terminated.`
      return Promise.reject(err)
    }
    // Increase the retry count
    config.__retryCount += 1
    // Create new promise to handle exponential backoff
    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, config.retryDelay)
    })
    // Return the promise in which recalls axios to retry the request
    return backoff.then(() => {
      return instance(config)
    })
  })

  return instance
}

export class DataFetch {
  /**
   * @method 创建一个新的axios示例
   * @desc {Function} {request} 请求拦截器函数
   * @desc {Function} {response} 响应拦截器正常处理函数
   * @desc {Function} {reject} 响应拦截器错误处理函数
   * @desc {Number} {retry} 自动重试次数(为0代表不重试)
   * @desc {Number} {retryDelay} 再次重试的延迟毫秒数(默认1秒)
   * @desc {Number} {timeout} 当前请求的超时毫秒数(默认30秒)
   * @desc {Object} {headers} 当前请求的header
   * @desc {Object} {extras} 其他配置参数
   * @returns 返回新的axios对象
   */
  static create({
                  request = EMPTY_FUNC,
                  response = EMPTY_FUNC,
                  reject = EMPTY_FUNC,
                  retry = 0,
                  retryDelay = 1000,
                  timeout = 30000,
                  headers = EMPTY_OBJECT,
                  ...extras
                } = EMPTY_OBJECT) {
    const $axios = axios.create({ headers, timeout, ...extras })
    if (extras.baseURL) {
      $axios.defaults.baseURL = extras.baseURL
    }
    if (extras.responseType) {
      $axios.defaults.responseType = extras.responseType
    }
    for (let [key, val] of Object.entries(headers)) {
      $axios.defaults.headers.common[key] = val
    }
    // axios默认使用encodeURI进行编码，会造成参数中带有敏感字符，所以需要使用encodeURIComponent进行编码
    $axios.defaults.paramsSerializer = params => {
      return Object.entries(params).reduce((res, [key, val]) => {
        const value = (DataType.isObject(val) || DataType.isArray(val)) ? JSON.stringify(val) : val
        res += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
        return res
      }, '').slice(0, -1)
    }
    return _configInterceptor(retry, retryDelay, {
      instance: $axios,
      request,
      response,
      reject
    })
  }

  /**
   * @method 根据当前url请求数据
   * @param {String} url 当前请求的url
   * @param {Object} {baseUrl,proxy,env,apiKey,method,params,retry,retryDelay,timeout,headers,extras} 当前请求的可选参数
   * @desc {String} baseUrl 当前请求的域名url
   * @desc {Boolean} proxy 当前请求是否开启代理（默认不开启）
   * @desc {Object} {env} 当前环境变量的配置对象
   * @desc {String} {apiKey} 当前请求的Api键值(多个Api时起作用，用于过滤)
   * @desc {String} {method} 当前请求的方法(get,post,...)
   * @desc {Object} {params} 当前请求的参数
   * @desc {Boolean} {query} 是否将请求字符串中的参数转化为params（默认为true）
   * @desc {Number} {retry} 自动重试次数(为0代表不重试)
   * @desc {Number} {retryDelay} 再次重试的延迟毫秒数(默认1秒)
   * @desc {Number} {timeout} 当前请求的超时毫秒数(默认30秒)
   * @desc {Object} {headers} 当前请求的header
   * @desc {Object} {instance} 当前axios请求实例
   * @desc {Object} {source} 网络请求生成token
   * @desc {Object} {extras} 其他配置参数
   * @returns 返回当前请求的promise
   */
  static axios(url, {
    baseUrl,
    proxy = false,
    env,
    apiKey = '',
    method = REQUEST_METHOD.GET,
    retry = 0,
    retryDelay = 1000,
    timeout = 30000,
    headers = EMPTY_OBJECT,
    params = EMPTY_OBJECT,
    query = true,
    instance,
    source,
    ...extras
  } = EMPTY_OBJECT) {
    const $params = params
    const $baseUrl = baseUrl
    const $method = method
    const $headers = headers
    const $url = url
    const $query = query
    const $timeout = timeout
    return new Promise((resolve, reject) => {
      const options = {
        ...DEFAULT_FETCH_OPTIONS,
        url: $url,
        baseURL: _parseBaseUrl($baseUrl, env, proxy, apiKey),
        method: $method,
        headers: $headers,
        query: $query,
        timeout: $timeout,
        ...extras
      }
      if ($method === REQUEST_METHOD.GET) {
        options.params = $params
      } else {
        if (options.query) {
          const query = DataUtil.getUrlQuery(options.url)
          if (query) {
            options.url = options.url.substr(0, options.url.indexOf('?'))
            options.params = query
          }
        }
        if ($headers['Content-Type'] === CONTENT_TYPE.FORM) {
          options.data = qs.stringify($params, { arrayFormat: 'brackets' })
        } else if ($headers['Content-Type'] === CONTENT_TYPE.UPLOAD) {
          const $form = new FormData()
          for (let [key, val] of Object.entries($params)) {
            $form.append(key, val)
          }
          options.data = $form
        } else {
          options.data = $params
        }
      }
      const { baseURL, url, method, params, data, timeout, headers, file, responseType = 'json' } = options
      const baseUrl = instance.defaults.baseURL || baseURL
      const config = { baseUrl, method, url, params, data, timeout, headers, responseType }
      options.cancel && (config.cancelToken = source.token)
      const $promise = instance ? instance(config) : _configInterceptor(retry, retryDelay)(options)
      $promise.then(res => {
        if (res && res.status === 200) {
          // 处理文件上传
          if (responseType === 'blob') {
            const content = res.headers['content-disposition']
            const filename = /fileName=([\w\W]+(\.\w+));/gi.test(content.endsWith(';') ? content : content + ';') && file ? `${file}${RegExp.$2}` : RegExp.$1
            DataUtil.downloadFile(res.data, decodeURIComponent(filename))
            resolve({ blob: true })
          } else {
            resolve(res.data)
          }
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  /**
   * @method 根据当前多个url同时发送请求
   * @param {Array} options 当前请求配置(包含url,config)
   * @returns 返回当前多个请求的promise
   */
  static all(options = EMPTY_ARRAY) {
    if (DataType.isEmptyArray(options)) return
    const $axios = []
    options.forEach(item => {
      if (!DataType.isEmptyObject(item) && DataType.isString(item.url) && DataType.isObject(item.config)) {
        $axios.push(this.axios(item.url, item.config))
      }
    })
    if (DataType.isEmptyArray($axios)) return
    return Promise.all($axios)
  }
}
