/**
 * @file DataCrypto
 * @description 基于crypto封装的数据安全类
 */
import CryptoJS from 'crypto-js'
import { DataUtil } from './data-util'
import { ASYMMETRIC_CRYPTO_TYPE, SYMMETRIC_CRYPTO_TYPE } from '../constants'

/* 采用策略模式实现 */
const _crypto_core = (() => {
  const context = {}
  // 非对称加密策略
  Object.keys(ASYMMETRIC_CRYPTO_TYPE).forEach(prop => {
    const _item = ASYMMETRIC_CRYPTO_TYPE[prop]
    if (_item.name) {
      const _crypto = CryptoJS[_item.name]
      context[_item.name] = { symmetric: false }
      if (_item.hmac) {
        context[_item.name] = { ...context[prop], encrypt: (data, key) => _crypto(data, key).toString() }
      } else if (_item.params) {
        context[_item.name] = { ...context[prop], encrypt: (data, key) => _crypto(data, key, _item.params).toString() }
      } else {
        context[_item.name] = { ...context[prop], encrypt: (data) => _crypto(data).toString() }
      }
    }
  })
  // 对称加密策略
  Object.keys(SYMMETRIC_CRYPTO_TYPE).forEach(prop => {
    const _item = SYMMETRIC_CRYPTO_TYPE[prop]
    if (_item.name) {
      context[_item.name] = { symmetric: true }
      if (_item.encoding) {
        context[_item.name] = {
          ...context[_item.name],
          encrypt: (data) => CryptoJS.enc[_item.name].stringify(CryptoJS.enc.Utf8.parse(data)).toString(),
          decrypt: (data) => CryptoJS.enc.Utf8.stringify(CryptoJS.enc[_item.name].parse(data))
        }
      } else {
        const _key = (key) => CryptoJS.enc.Utf8.parse(key)
        const _cfg = (iv) => ({
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.CFB,
          padding: CryptoJS.pad.Pkcs7,
          format: CryptoJS.format.Hex
        })
        const _iv = DataUtil.defaultVal(_item.iv, true)
        const { encrypt, decrypt } = CryptoJS[_item.name]
        if (_iv) {
          context[_item.name] = {
            ...context[_item.name],
            encrypt: (data, key, iv) => encrypt(CryptoJS.enc.Utf8.parse(data), _key(key), _cfg(iv)).toString(),
            decrypt: (data, key, iv) => decrypt(CryptoJS.lib.CipherParams.create({
              ciphertext: CryptoJS.enc.Hex.parse(data)
            }), _key(key), _cfg(iv)).toString(CryptoJS.enc.Utf8)
          }
        } else {
          context[_item.name] = {
            ...context[_item.name],
            encrypt: (data, key) => encrypt(CryptoJS.enc.Utf8.parse(data), _key(key)).toString(CryptoJS.format.Hex),
            decrypt: (data, key) => decrypt(CryptoJS.lib.CipherParams.create({
              ciphertext: CryptoJS.enc.Hex.parse(data)
            }), _key(key)).toString(CryptoJS.enc.Utf8)
          }
        }
      }
    }
  })
  return context
})()
const _checkCrypto = (crypto) => {
  const _context = _crypto_core[crypto]
  if (!_context) {
    console.error(`指定的加密算法[${crypto}]不在${ASYMMETRIC_CRYPTO_TYPE}或${SYMMETRIC_CRYPTO_TYPE}范围内！`)
    return false
  }
  return _context
}

export class DataCrypto {
  /**
   * @method 加密当前的数据
   * @param data 需要加密的数据
   * @param crypto 加解密策略(ASYMMETRIC_CRYPTO_TYPE | SYMMETRIC_CRYPTO_TYPE)
   * @param key 密钥(来自应用配置)
   * @param iv 矢量(来自应用配置)
   * @returns {String} 加密之后的密文字符串
   */
  static encrypt(data, crypto, { key = '', iv = '' } = {}) {
    const _context = _checkCrypto(crypto.name)
    if (!_context) return data
    return _context.symmetric ? _context.encrypt(data, key, iv) : _context.encrypt(data, key)
  }
  /**
   * @method 解密当前的数据
   * @param data 需要解密的数据
   * @param crypto 加解密策略(ASYMMETRIC_CRYPTO_TYPE | SYMMETRIC_CRYPTO_TYPE)
   * @param key 密钥(来自应用配置)
   * @param iv 矢量(来自应用配置)
   * @returns {String} 解密之后的原文字符串
   */
  static decrypt(data, crypto, { key = '', iv = '' } = {}) {
    const _context = _checkCrypto(crypto.name)
    if (!_context) return data
    return _context.symmetric ? _context.decrypt(data, key, iv) : ''
  }
}
