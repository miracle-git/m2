/**
 * @file DataApi
 * @description 获取应用Api配置映射
 */
import { DataType } from './data-type'
import { DataStorage } from './data-storage'
import { IsDev, cacheEnvKeys } from './data-env'
import { SYMMETRIC_CRYPTO_TYPE } from '../constants'

const _api_prefix = (prefix) => {
  const result = { prefix: '', exclude: '' }
  if (DataType.isObject(prefix) && ('prefix' in prefix)) {
    result.prefix = prefix.prefix
    result.exclude = prefix.key || 'others'
  } else if (DataType.isString(prefix)) {
    result.prefix = prefix
  }
  return result
}

const _api_mapping = (config, _prefix, mock) => {
  let { prefix, exclude } = _api_prefix(_prefix)
  return Object.keys(config).reduce((api, key) => {
    const val = config[key]
    if (_prefix.multi) {
      prefix = _prefix[key] || ''
    }
    if (DataType.isString(val)) {
      if (!val.startsWith('/')) {
        config[key] = `/${val}`
      }
      if (mock && mock.urls.indexOf(config[key]) > -1) {
        api[key] = `${prefix}${mock.prefix}${config[key]}`
      } else {
        api[key] = `${prefix}${config[key]}`
      }
    }
    if (DataType.isObject(val)) {
      api[key] = _api_mapping(val, (key === exclude ? '' : prefix), mock)
    }
    return api
  }, {})
}

const _api_mocking = (config) => {
  let mock = null
  if (DataType.isArray(config)) {
    mock = {
      prefix: '/mock',
      urls: config
    }
  } else if (DataType.isObject(config)) {
    const { prefix = '/mock', urls } = config
    if (!DataType.isEmptyArray(urls)) {
      mock = {
        prefix,
        urls
      }
    }
  }
  return mock
}

export const getDataApi = (config, prefix = '', mock = null) => {
  let api = {}
  mock = _api_mocking(mock)
  const _cacheKey = cacheEnvKeys.api
  const cache = DataType.isString(prefix) || (DataType.isObject(prefix) && prefix.cache)
  if (!IsDev && cache) {
    api = DataStorage.get(_cacheKey, { encryptType: SYMMETRIC_CRYPTO_TYPE.DES })
    if (!api) {
      api = _api_mapping(config, prefix, mock)
      DataStorage.set(_cacheKey, api, { encryptType: SYMMETRIC_CRYPTO_TYPE.DES })
    }
  } else {
    api = _api_mapping(config, prefix, mock)
  }
  return api
}
