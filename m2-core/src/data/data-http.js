/**
 * @file DataHttp
 * @description 基于DataFetch网络客户端封装
 */
import { CancelToken } from 'axios'
import { DEFAULT_FETCH_OPTIONS, EMPTY_FUNC, EMPTY_OBJECT, EMPTY_ARRAY, REQUEST_METHOD, APP_INSTANCE_READY } from '../constants'
import { DataFetch } from './data-fetch'
import { DataType } from './data-type'
import { DataUtil } from './data-util'
import { DataBus } from './data-bus'

const _http_core = {
  _parse: (res, prop) => {
    if (prop in res) {
      if (DataType.isTrueOrZero(res[prop])) {
        return { data: res[prop] }
      }
    }
    return false
  },
  _check: (res, check = EMPTY_FUNC, map = EMPTY_OBJECT, app) => {
    let _result = true
    !DataType.isEmptyFunction(check) && (_result = check(res, app))
    const { status = 'status', result = 'result', message = 'message', value = 0, success = EMPTY_FUNC } = map
    if (_result) {
      if (res.blob) {
        return { success: true, data: true }
      }
      const isSuccess = DataType.isBoolean(res[status]) && res[status]
      if (isSuccess || res[status] === value || success(res)) {
        return { success: true, ...(_http_core._parse(res, result)) }
      }
    }
    return { success: false, data: null, msg: res[message] }
  },
  _spinner: {
    show(loading, app) {
      loading && app && app.$m2 && app.$m2.loading()
    },
    hide(loading, app) {
      loading && app && app.$m2 && app.$m2.loading.hide()
    }
  },
  _handle: (res, data, handle = EMPTY_FUNC, options = EMPTY_OBJECT, app) => {
    if (options.origin) return data
    !DataType.isEmptyFunction(handle) && (res = handle(res, app))
    if (options.key) {
      if (DataType.isArray(res.data)) {
        res.data.map(item => item._key = DataUtil.randomString(options.keyLen))
      } else if (DataType.isArray(res.data[DEFAULT_FETCH_OPTIONS.itemsName])) {
        res.data[DEFAULT_FETCH_OPTIONS.itemsName].map(item => item._key = DataUtil.randomString(options.keyLen))
      }
    }
    return res.data
  }
}

/**
 * @method 基于DataFetch网络客户端封装
 * @param {Object} {ctx,env,instance,spinner,check,handle,map,error} 当前客户端的可选参数
 * @desc {Boolean} {ctx} 是否启用应用上下文(默认false)
 * @desc {Object} {env} 当前环境配置
 * @desc {Object} {axios} 当前请求实例(可使用DataFetch构建，也可配置详细参数，参考axios配置)
 * @desc {Object} {map} 数据映射(对返回数据字段映射)
 * @desc {Function} {spinner} 当前加载器函数(覆盖默认加载器，loading当前请求是否启动加载器)
 * @desc {Function} {check} 数据校验函数(对返回数据的权限校验，app应用上下文，返回boolean)
 * @desc {Function} {handle} 数据处理函数(对返回数据的处理函数, 返回处理结果)
 * @desc {Function} {error} 全局错误处理函数(err是包含title,message的对象)
 */
class DataHttpObject {
  constructor({ ctx, env, axios, map, spinner, check, handle, error }) {
    this._ctx = ctx
    this._env = env
    this._axios = axios || DataFetch.create()
    this._map = map
    this._spinner = spinner
    this._check = check
    this._handle = handle
    this._error = error
    this._source = CancelToken.source()
  }
  // 私有方法
  _fetch(url, options) {
    const _this = this
    return new Promise((resolve, reject) => {
      const loadData = app => {
        const _spinner = _this._spinner || _http_core._spinner
        _spinner.show(options.loading, app)
        return DataFetch.axios(url, {
          ...options,
          env: _this._env,
          // apiKey: 'app', // 当存在多个api接口时，配置默认的apiKey(大多数场景使用的api服务)
          instance: _this._axios,
          source: _this._source
        }).then(res => {
          const _res = res
          res = _http_core._check(res, _this._check, _this._map, app)
          if (res.success) {
            resolve(_http_core._handle(res, _res, _this._handle, options, app))
          } else {
            const _error = options.origin ? _res : {
              title: `接口:[${url}]调用失败`,
              message: _res ? _res[this._map.message] : '请求失败',
              ..._res
            }
            !DataType.isEmptyFunction(_this._error) && _this._error(_error, app)
            reject(_error)
          }
        }).catch(err => {
          const _error = options.origin ? err : {
            title: `接口:[${url}]调用异常`,
            message: err ? err[this._map.message] : '请求失败',
            ...err
          }
          !DataType.isEmptyFunction(_this._error) && _this._error(_error, app)
          reject(_error)
        }).finally(() => {
          _spinner.hide(options.loading, app)
        })
      }
      if (this._ctx) {
        if (window.__context__) {
          loadData(window.__context__)
        } else {
          DataBus.on(APP_INSTANCE_READY, loadData)
        }
      } else {
        loadData()
      }
    })
  }
  _fetchAll(options = EMPTY_ARRAY) {
    if (DataType.isEmptyArray(options)) return
    const _this = this
    const loading = options.some(opt => opt && opt.config && opt.config.loading)
    return new Promise((resolve, reject) => {
      const loadData = app => {
        const _spinner = _this._spinner || _http_core._spinner
        _spinner.show(options.loading, app)
        options.forEach(opt => opt.config = { ...opt.config, env: _this._env, instance: _this._axios })
        return DataFetch.all(options).then(res => {
          resolve(res.map((data, index) => {
            const _data = data
            data = _http_core._check(data, _this._check, _this._map, app)
            return _http_core._handle(data, _data, _this._handle, options[index].config, app)
          }))
        }).catch(err => {
          const _error = {
            title: `接口调用异常`,
            ...err
          }
          !DataType.isEmptyFunction(_this._error) && _this._error(_error, app)
          reject(_error)
        }).finally(() => {
          _spinner.hide(loading, app)
        })
      }
      if (this._ctx) {
        if (window.__context__) {
          loadData(window.__context__)
        } else {
          DataBus.on(APP_INSTANCE_READY, loadData)
        }
      } else {
        loadData()
      }
    })
  }
  // 通用请求客户端封装
  get = (url, options = {}) => this._fetch(url, options)
  post = (url, options = {}) => this._fetch(url, { ...options, method: REQUEST_METHOD.POST })
  put = (url, options = {}) => this._fetch(url, { ...options, method: REQUEST_METHOD.PUT })
  patch = (url, options = {}) => this._fetch(url, { ...options, method: REQUEST_METHOD.PATCH })
  del = (url, options = {}) => this._fetch(url, { ...options, method: REQUEST_METHOD.DELETE })
  all = (...options) => this._fetchAll(options)
  cancel = (message) => this._source.cancel(message)
  proxyGet = (url, options = {}) => this._fetch(url, { ...options, proxy: true })
  proxyPost = (url, options = {}) => this._fetch(url, { ...options, proxy: true, method: REQUEST_METHOD.POST })
  proxyPut = (url, options = {}) => this._fetch(url, { ...options, proxy: true, method: REQUEST_METHOD.PUT })
  proxyPatch = (url, options = {}) => this._fetch(url, { ...options, proxy: true, method: REQUEST_METHOD.PATCH })
  proxyDel = (url, options = {}) => this._fetch(url, { ...options, proxy: true, method: REQUEST_METHOD.DELETE })
  proxyAll = (...options) => this._fetchAll(options.map(item => ({ ...item, config: { ...item.config, proxy: true } })))
  proxy = {
    get: this.proxyGet,
    post: this.proxyPost,
    put: this.proxyPut,
    patch: this.proxyPatch,
    del: this.proxyDel,
    all: this.proxyAll
  }
}
// 构建单一模式的DataHttp
export const DataHttp = {
  getInstance: (function () {
    let instance
    return function ({ multi = false, ctx, env, axios, spinner, check, handle, map, error } = EMPTY_OBJECT) {
      if (multi || !instance) {
        instance = new DataHttpObject({ ctx, env, axios, spinner, check, handle, map, error })
      }
      return instance
    }
  })(),
  create: DataFetch.create
}
