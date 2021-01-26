## m2-core

[![](https://img.shields.io/badge/m2--core-v1.5.0-green.svg)](https://github.com/miracle-git/m2.git) <br/>
> M2前端框架核心通用底层库。

### 用法
- 安装
```bash
npm install m2-core
```
### APIs
- **getDataApi** 获取应用程序API地址映射对象。
- *提示1：可配置mock api, 在实际开发过程中，部分api是mock实现的，则可传入mock参数(也可指定mock api前缀)，如果同时出现在config和mock中以mock优先*
- *提示2：可配置第三方api, 在实际开发过程中，可能有些api不是应用本身而是来源于第三方，可统一配置到config下面的某个字段，并在prefix参数的key中配置*
####
| 参数 | 类型 | 描述 | 默认值 | 示例 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| config | object | api键值对配置 | — | { 'getDictList': '/dict','getDataList': '/home/data_list', 'getDataItem': '/home/data_item' } |
| prefix | string/object | api前缀 | — | '/api'|
| mock | array/object | mock对象 | — | ['/user/list', '/product/detail'], { prefix: '/mock-api', urls: ['/user/list', '/product/detail'] } |

```js
// api.conf.js
import { getDataApi } from 'm2-core'

// no mock api
export default getDataApi({
 getDictList: '/dict/list',
 getDataList: '/home/data_list',
 getDataItem: '/home/data_item',
 user: {
   list: '/user/list',
   detail: '/user/detail'
 },
 product: {
   list: '/product/list',
   detail: '/product/detail',
   category: '/product/category'
 }
}, '/api')
// with multi api
export default getDataApi({
 // 建议将其他api都归类到common下
 common: {
   getDictList: '/dict/list',
   getDataList: '/home/data_list',
   getDataItem: '/home/data_item',
 },
 user: {
   list: '/list',
   detail: '/detail'
 },
 product: {
   list: '/list',
   detail: '/detail',
   category: '/category'
 }
}, {
  multi: true,
  user: '/api/user',
  product: '/api/product',
  common: '/api'
})
// with mock api
export default getDataApi({
 getDictList: '/dict/list',
 getDataList: '/home/data_list',
 getDataItem: '/home/data_item',
 user: {
   list: '/user/list',
   detail: '/user/detail'
 },
 product: {
   list: '/product/list',
   detail: '/product/detail',
   category: '/product/category'
 }
}, '/api', [
   '/user/list',
   '/product/detail'
])
export default getDataApi({
 getDictList: '/dict/list',
 getDataList: '/home/data_list',
 getDataItem: '/home/data_item',
 user: {
   list: '/user/list',
   detail: '/user/detail'
 },
 product: {
   list: '/product/list',
   detail: '/product/detail',
   category: '/product/category'
 }
}, '/api', {
  prefix: '/mock-api',
  urls: [
    '/user/list',
    '/product/detail'
  ]
})
// with exclude api
export default getDataApi({
 getDictList: '/dict/list',
 getDataList: '/home/data_list',
 getDataItem: '/home/data_item',
 user: {
   list: '/user/list',
   detail: '/user/detail'
 },
 product: {
   list: '/product/list',
   detail: '/product/detail',
   category: '/product/category'
 },
 others: {
   maps: '/google/map',
   books: '/amazon/books'
 }
}, {
   prefix: '/api',
   // key: 'others' // default value,
   // the same as params **config** last prop
})
 ````
- **DataEnv** 应用程序多环境配置变量。
####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| IsDev | boolean | 是否为开发环境 | if (IsDev) { //:todo }|
| getBuildEnv | func | 获取当前应用编译环境 | getBuildEnv() |
| getEnvAlias | func | 获取环境变量别名 | getEnvAlias() |
| getEnvConfig | func | 获取当前环境指定配置项的值，如果未指定配置项，则获取当前环境的所有配置 | getEnvConfig('api') |
```js
// env.conf.js
export default {
  loc: {
    api: 'http://test.app.oa.com/m2',
    // support multi-api config(you need to add apiKey, eg：'mock', 'app')
    // api: {
    //   mock: 'http://test.app.oa.com/m2/mock',
    //   app: 'http://test.app.oa.com/m2'
    // }
  },
  dev: {
    api: 'http://dev.app.oa.com/m2'
  },
  sit: {
    api: 'http://sit.app.oa.com/m2'
  },
  uat: {
    api: 'http://uat.app.oa.com/m2'
  },
  prd: {
    api: 'http://app.oa.com/m2'
  }
}
````
- **DataEvent** 通用事件处理。
####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| scroll | func | 注册滚动事件 | DataEvent.scroll(() => { console.log('scrolling');}, {threshold: 50}) |
| throttle | func | 注册截流事件 | DataEvent.throttle(() => { console.log('throttle');}, 3000) |
| debounce | func | 注册防抖事件 | DataEvent.debounce(() => { console.log('debounce');}, 3000) |
- **DataBus** 数据总线处理。
####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| on | func | 监听事件处理函数 | DataBus.on('data', (res) => { console.log(res.name);}) |
| off | func | 移除事件处理函数 | DataBus.off('data'}) |
| emit | func | 触发事件 | DataBus.emit('data', { name: 'm2' }}) |
- **DataType** 检测数据类型和处理类型转换。
####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| isObject | func | 检测是否为对象 | DataType.isObject({ name: 'm2'}) |
| isPlainObject | func | 检测是否为普通对象(非内置或非window对象) | DataType.isPlainObject({ name: 'm2' }) |
| isEmptyObject | func | 检测是否为空对象(null,{})  | DataType.isEmptyObject({}) |
| isArray | func | 检测是否为数组  | DataType.isArray([{ name: 'm2' }]) |
| isEmptyArray | func | 检测是否为空数组  | DataType.isEmptyArray([]) |
| isFunction | func | 检测是否为函数  | DataType.isFunction(()=>{console.log('m2')}) |
| isEmptyFunction | func | 检测是否为空函数  | DataType.isFunction(()=>{}) |
| isString | func | 检测是否为字符串  | DataType.isString('m2') |
| isNumber | func | 检测是否为数字  | DataType.isNumber(100) |
| isBoolean | func | 检测是否为布尔值 | DataType.isBoolean(true) |
| isGuid | func | 检测是否为Guid | DataType.isGuid('a0da5831-7488-464d-8a89-db89b7ff8f2b') |
| isMobilePhone | func | 检测是否为手机号(可自定义正则检测) | DataType.isMobilePhone('13366668888') |
| isTelPhone | func | 检测是否为电话号码(可自定义正则检测) | DataType.isTelPhone('010-66668888') |
| isPhone | func | 检测是否为手机号或电话号码(可自定义正则检测) | DataType.isPhone('010-66668888') |
| isEmail | func | 检测是否为电子邮件(可自定义正则检测) | DataType.isEmail('12345678@qq.com') |
| isIdCard | func | 检测是否为身份证号(可自定义正则检测) | DataType.isIdCard('511381198808083520') |
| isValidPassword | func | 检测是否为合法密码(可自定义正则检测) | DataType.isValidPassword('1988_$abd') |
| isValidDate | func | 检测是否为合法日期 | DataType.isValidDate('2020-01-20') |
| isTrueOrZero | func | 检测是否为true或0 | DataType.isTrueOrZero('0') |
- **DataFetch** 基于axios封装的http请求(单一实例)。
- *提示：<font color=#f81d22>已转为内部调用，在实际开发过程中推荐使用DataHttp。</font>*
  ####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| create | func | 创建axios的实例 | DataFetch.create({ retry, retryDelay, timeout, headers, responseType, ... }) |
| axios | func | 发送http请求 |  DataFetch.axios('/api/user/list', { baseUrl, env, proxy, apiKey, method, timeout, headers, params }) |
| all | func | 合并发送多个http请求 | DataFetch.all([{url: '/api/user', config: { params, loading }}, {url: '/api/product', config: { params, loading }}]) |
- **DataHttp** 基于DataFetch封装的http请求(多实例)。
- *提示：在实际开发过程中推荐使用DataHttp，首先需要创建一个DataHttp实例http，然后通过实例去调用*
- *提示：配置参数包含很多(baseUrl, env, proxy, apiKey, method, timeout, headers, params, origin, responseType)，但比较常用的也就是params, loading, origin, responseType*
```js
import { DataHttp } from 'm2-core'
// import { env } from './index'

export default DataHttp.getInstance({
  // 是否开启多实例
  // multi: true,

  // 开启应用上下文
  ctx: true,

  // 开启多环境配置
  // env,

  // 当前请求实例(可使用DataHttp构建，也可配置详细参数，参考axios配置)
  axios: DataHttp.create({
    // baseURL: conf('api'),
    headers: {
      'swagger': 'm2-data-http'
    }
  }),

  // 数据响应映射(当返回数据不满足{status,result,message}格式时，对返回数据字段映射)
  // 当status字段是boolean时，不必配置value；反之需要同时配置status和value来做成功标识；当不存在status和value都不存在，可配置success(res)函数自定义成功标识
  map: { status: 'code', result: 'data', message: 'msg', value: 1 }

  // 当前加载器函数(覆盖默认加载器，loading当前请求是否启动加载器)
  // spinner(loading) {},

  // 数据校验函数(对返回数据的权限校验，app为应用上下文，返回boolean)
  // check(res, app) {}

  // 数据处理函数(对返回数据的处理函数，app为应用上下文, 返回处理结果)
  // handle(res, app) {}

  // 全局错误处理函数(err是包含title，message的对象，app为应用上下文)
  // error(err, app) {}
})
```
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| get | func | 发送get请求 | http.get('/api/user', { params, loading, origin } ) |
| post | func | 发送post请求 | http.post('/api/user', { params, loading, origin } |
| put | func | 发送put请求 | http.put('/api/user', { params, loading, origin } |
| patch | func | 发送patch请求 | http.patch('/api/user', { params, loading, origin } |
| del | func | 发送del请求 | http.del('/api/user', { params, loading, origin } |
| all | func | 合并发送多个http请求 | http.all([{url: '/api/user', config: { params, loading, origin }}, {url: '/api/product', config: { params, loading, origin }}]) |
| proxyGet | func | 代理发送get请求 | http.proxyGet('/api/user', { params, loading, origin } |
| proxyPost | func | 代理发送post请求 | http.proxyPost('/api/user', { params, loading, origin } |
| proxyPut | func | 代理发送put请求 | http.proxyPut('/api/user', { params, loading, origin } |
| proxyPatch | func | 代理发送patch请求 | http.proxyPatch('/api/user', { params, loading, origin } |
| proxyDel | func | 代理发送del请求 | http.proxyDel('/api/user', { params, loading, origin } |
| proxyAll | func | 代理合并发送多个http请求 | http.proxyAll([{url: '/api/user', config: { params, loading, origin }}, {url: '/api/product', config: { params, loading, origin }}]) |
| proxy | func | 代理发送http请求 | http.proxy.get/post/put/patch/del('/api/user', { params, loading })/http.proxy.all([{url: '/api/user', config: { params, loading, origin }}, {url: '/api/product', config: { params, loading, origin }}]) |
#### 配置参数详解
| 参数 | 类型 | 描述 | 默认值 | 示例 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| params | object | 请求参数 | —— | { id: 'm2', name: 'm2-core' } |
| loading | boolean | 是否启用加载器效果 | false | —— |
| origin | boolean | 是否需要返回请求原始数据 | false | —— |
| query | boolean | 是否将请求字符串中的参数转化为params | true | —— |
| responseType | string | 请求响应类型(目前只支持类型: 'blob'-下载文件) | '' | —— |
| file | string | 下载的文件名(不包含后缀) | '' | —— |
| headers | object | 配置请求的headers | —— | —— |
| timeout | number | 当前请求的超时毫秒数(默认30秒) | 30000 | —— |
| key | boolean | 是否需要添加标识列_key(随机字符串) | false | —— |
| keyLen | number | 标识列的长度 | 5 | —— |
| retry | number | 自动重试次数(为0代表不重试) | 3 | —— |
| retryDelay | number | 再次重试的延迟毫秒数(默认1秒) | 1000 | —— |
| itemsName | string | 返回列表标识字段名(包含在data中) | 'list' | —— |
- **DataStorage** 统一提供封装LocalStorage(默认)和SessionStorage。
- *提示：缓存类型分为Local和Session，加密类型(SYMMETRIC_CRYPTO_TYPE)参照DataCrypto*
####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| get | func | 获取缓存中的数据(可指定缓存类型和加密类型) | DataStorage.get('m2', { storageType, encryptType }) |
| set | func | 将数据保存到缓存中(可指定缓存类型和加密类型) | DataStorage.set('m2', { name: 'm2'}, { storageType, encryptType })  |
| remove | func | 从缓存中移除指定的key(可指定缓存类型) | DataStorage.remove('m2', STORAGE_TYPE.Session) |
| clear | func | 清除所有的缓存(可指定缓存类型) | DataStorage.clear(STORAGE_TYPE.Local) |
| count | func | 获取缓存key的数量(可指定缓存类型) | DataStorage.count(STORAGE_TYPE.Local) |
| contains | func | 判断是否包含指定key对应的缓存(可指定缓存类型) | DataStorage.contains('m2', STORAGE_TYPE.Local) |
- **DataCrypto** 统一提供加解密算法(对称加密和非对称加密)。
- *提示：加密类型分类对称加密(SYMMETRIC_CRYPTO_TYPE)和非对称加密(ASYMMETRIC_CRYPTO_TYPE)*
####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| encrypt | func | 加密指定的数据(可指定加密类型) | DataSecurity.encrypt('m2', SYMMETRIC_CRYPTO_TYPE.DES) |
| decrypt | func | 解密指定的数据(可指定加密类型) | DataSecurity.decrypt('e1cf3f88a2dd46a6', SYMMETRIC_CRYPTO_TYPE.DES)  |
- **DataVerifyCode** 基于Canvas提供图形验证码。
- *提示：首先必须生成验证码实例verifyCode，然后通过实例去调用*
####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| validate | func | 生成图形验证码并判断用户输入是否与之相同 | const verifyCode = new DataVerifyCode('tx_verify_code'); verifyCode.validate(this.$input.value); |
- **DataUtil** 工具函数。
####
| 属性/方法 | 类型 | 描述 | 示例 |
| ------------ | ------------ | ------------ | ------------ |
| getDictItems | func | 获取指定类型的字典项 | DataUtil.getDictItems(dict, 'user_type', { typeName, itemsName}) |
| getDictValue | func | 获取指定类型字典下指定key对应的值 | DataUtil.getDictItems(dict, 'user_type', 'ut001', { typeName, itemsName, keyName, valueName, separator}) |
| extend | func | 对数组/对象执行深浅拷贝 | DataUtil.extend({}, {id:1,name:'m2',repositories:['m2-core','m2-vue','m2-mfe']}, true) |
| clone | func | 对数组/对象执行深浅拷贝并判断是否将结果转化为数组 | DataUtil.clone({id:1,name:'m2',repositories:['m2-core','m2-vue','m2-mfe']}, {deep:true,asArray:true}) |
| randomString | func | 生成指定长度(默认: 32)的随机字符串 | DataUtil.randomString(10) |
| randomNumber | func | 生成指定范围(min,max)的随机数字 | DataUtil.randomNumber(10, 50) |
| randomColor | func | 生成指定范围(min,max)的随机颜色 | DataUtil.randomColor(10, 50) |
| getLast12Months | func | 获取当前日期的前12个月份  | DataUtil.getLast12Months() |
| getSecureText | func | 对指定的字符串做星号屏蔽处理(可指定星号个数，前后多少位开始处理) | DataUtil.getSecureText('13566668888') |
| defaultVal | func | 获取对应数据项的值，如果未undefined则返回默认值 | DataUtil.defaultVal('loading', true)  |
| pick | func | 获取指定对象/数组指定列对应的数组或对象 | DataUtil.pick(users, 'name', 'age') |
| merge | func | 合并一个解构后的对象数组和指定的对象 | DataUtil.merge([{a:1},{b:2}], {c:3,d:4}) |
| uncamelize | func | 将字符串按大小字母分隔并返回(大写，小写，原样) | DataUtil.uncamelize('getDataList') |
| toUpperFirst | func | 将字符串首字母大写并返回 | DataUtil.toUpperFirst('m2') |
| redirect | func | 跳转到指定的url对应的地址 | DataUtil.redirect('/login') |
| getHashValue | func | 获取url中hash值（#到?之间的值）| DataUtil.getHashValue() |
| getQueryValue | func | 获取url中指定名称的查询字符串值(QueryString) | DataUtil.getQueryValue('name', 'http://xxx.com?name=m2') |
| getUrlQuery | func | 获取url字符串问号之后的值并转化为对象 | DataUtil.getUrlQuery('http://xxx.com?name=m2') |
| formatMoney | func | 数字千分位格式化 | DataUtil.formatMoney(123456789.123) |
| unformatMoney | func | 将千分位格式的数字字符串转换为浮点数 | DataUtil.unformatMoney('123,456,789.00') |
| formatDate | func | 根据指定的格式(默认: 'yyyy-MM-dd')将被日期格式化 | DataUtil.formatDate(1536290438) |
| formatDateTime | func | 根据指定的格式(默认: 'yyyy-MM-dd HH:mm:ss')将被日期时间格式化 | DataUtil.formatDateTime(1536290438) |
| formatShortDateTime | func | 根据指定的格式(默认: 'yyyy-MM-dd HH:mm')将被日期时间去秒格式化 | DataUtil.formatShortDateTime(1536290438) |
| formatTime | func | 根据指定的格式(默认: 'HH:mm:ss')将被时间格式化 | DataUtil.formatTime(1536290438) |
| formatShortTime | func | 根据指定的格式(默认: 'HH:mm')将被时间去秒格式化 | DataUtil.formatShortTime(1536290438) |
| padLeftZero | func | 字符串前导补0 | DataUtil.padLeftZero('4') |
| downloadFile | func | 下载文件 | DataUtil.downloadFile(data, '文件') |