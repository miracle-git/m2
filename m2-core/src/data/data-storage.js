/**
 * @file DataStorage
 * @description 基于localStorage/sessionStorage封装的存储类
 */
import { STORAGE_TYPE, SYMMETRIC_CRYPTO_TYPE, DEFAULT_STORAGE_OPTIONS } from '../constants'
import { DataCrypto } from './data-crypto'
import { DataType } from './data-type'

const _store_core = (storageType, encryptType = '') => {
  if (!encryptType) {
    return ({
      storage: storageType === STORAGE_TYPE.Local ? localStorage : sessionStorage
    })
  }
  const { encryptKey, encryptIv } = DEFAULT_STORAGE_OPTIONS
  const encryptParams = { key: encryptKey, iv: encryptIv }
  return {
    storage: storageType === STORAGE_TYPE.Local ? localStorage : sessionStorage,
    secret: encryptType === SYMMETRIC_CRYPTO_TYPE.AES || encryptType === SYMMETRIC_CRYPTO_TYPE.DES || encryptType === SYMMETRIC_CRYPTO_TYPE.RC4,
    encrypt: (data, secret = false) => secret ? DataCrypto.encrypt(data, encryptType, encryptParams) : data,
    decrypt: (data, secret = false) => secret ? DataCrypto.decrypt(data, encryptType, encryptParams) : data
  }
}
export class DataStorage {
  /**
   * @method 获取存储实例中指定key对应的值
   * @param key 当前存储的key
   * @param options[storageType] 存储类型（默认：STORAGE_TYPE.Local）
   * @param options[encryptType] 加密类型（默认：SYMMETRIC_CRYPTO_TYPE.NONE, 仅限于AES,DES,RC4）
   * @desc 值可能为简单类型，对象或数组
   * @returns 返回当前存储key对应的值
   */
  static get(key, options = null) {
    const { storageType, encryptType } = { ...DEFAULT_STORAGE_OPTIONS, ...options }
    const { storage, secret, decrypt } = _store_core(storageType, encryptType)
    try {
      return JSON.parse(decrypt(storage[key] || '', secret))
    } catch (e) {
      return decrypt(storage.getItem(key) || '', secret)
    }
  }
  /**
   * @method 设置指定key和value到储存实例中
   * @param key 当前存储的key
   * @param value 当前存储的value
   * @param options[storageType] 存储类型（默认：STORAGE_TYPE.Local）
   * @param options[encryptType] 加密类型（默认：SYMMETRIC_CRYPTO_TYPE.NONE, 仅限于AES,DES,RC4）
   * @desc 支持简单数据类型，对象或数组的存储
   */
  static set(key, value, options = null) {
    const { storageType, encryptType } = { ...DEFAULT_STORAGE_OPTIONS, ...options }
    const { storage, secret, encrypt } = _store_core(storageType, encryptType)
    if (DataType.isObject(value) || DataType.isArray(value)) {
      storage[key] = encrypt(JSON.stringify(value), secret)
    } else {
      storage.setItem(key, encrypt(value, secret))
    }
  }
  /**
   * @method 从存储实例中删除指定的key
   * @param key 当前存储的key
   * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
   */
  static remove(key, storageType = STORAGE_TYPE.Local) {
    const { storage } = _store_core(storageType)
    storage.removeItem(key)
  }
  /**
   * @method 从存储实例中删除所有的key
   * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
   */
  static clear(storageType = STORAGE_TYPE.Local) {
    const { storage } = _store_core(storageType)
    storage.clear()
  }
  /**
   * @method 获取存储实例中的个数
   * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
   */
  static count(storageType = STORAGE_TYPE.Local) {
    const { storage } = _store_core(storageType)
    return storage.length
  }
  /**
   * @method 获取存储实例中是否包含指定key的实例
   * @param key 当前存储的key
   * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
   */
  static contains(key, storageType = STORAGE_TYPE.Local) {
    const { storage } = _store_core(storageType)
    return key in storage
  }
}
