/**
 * @file DataEnv
 * @description 获取应用的环境变量基础配置
 */
import { DataStorage } from './data-storage'

export const DataEnv = {
  loc: { env: 'localhost', alias: 'loc' },
  dev: { env: 'development', alias: 'dev' },
  sit: { env: 'stagingment', alias: 'sit' },
  uat: { env: 'integration', alias: 'uat' },
  prd: { env: 'production', alias: 'prd' }
}
// 是否为开发环境
export const IsDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'localhost'
export const getBuildEnv = () => process.env.BUILD_ENV || process.env.VUE_APP_BUILD_ENV
export const getEnvAlias = (buildEnv) => {
  const currentEnv = Object.values(DataEnv).find(item => item.env === buildEnv)
  return currentEnv ? currentEnv.alias : 'dev'
}
export const getEnvConfig = (env, key = '') => {
  let config
  const _buildEnv = getBuildEnv()
  const _cacheKey = cacheEnvKeys.env

  if (!IsDev && !key) {
    config = DataStorage.get(_cacheKey)
    if (config) return config
  }

  for (let prop in env) {
    const currentEnv = { ...(DataEnv[prop] || { env: prop, alias: prop }), ...env[prop] }
    if (currentEnv.env === _buildEnv || currentEnv.alias === _buildEnv) {
      config = key ? currentEnv[key] : currentEnv
      if (config) {
        !IsDev && DataStorage.set(_cacheKey, config)
      }
      break
    }
  }

  return config
}

export const cacheEnvKeys = {
  api: `m2:app_api_mapping_${getEnvAlias(getBuildEnv())}`,
  env: `m2:app_env_config_${getEnvAlias(getBuildEnv())}`,
  url: `m2:app_api_url_${getEnvAlias(getBuildEnv())}`
}
