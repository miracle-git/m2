## m2-mfe

[![](https://img.shields.io/badge/m2--mfe-v1.1.0-green.svg)](https://github.com/miracle-git/m2.git) <br/>
> M2基于qiankun的微前端框架。

### 用法
- 安装
```bash
npm install m2-mfe
```
### APIs
- **renderApp** 渲染主框架应用。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | render | func | 当前渲染函数(基于vue或react) | — | — |
 | rootApp | object | 当前应用的根组件(可能是对象或组件) | — | — |
 | options | object | 当前扩展配置 | — | {el,init,router,store,i18n,plugins,content,loading,cookie,fastclick,lazy} |
- **registerApp** 注册微应用并挂载生命周期函数。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | apps | array| 需要注册的微应用列表 | — | — |
 | options | object | 生命周期函数 | — | { bootstrap,mount,unmount } |
- **startApp** 启动微应用。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | options | object | 当前扩展配置(prefetch, defaultApp, mounted) | — | — |
- **filterApps** 获取有权限访问的微应用列表。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | mfe | object | 微前端框架环境配置文件 | — | window.__mfe__
 | data | object | 从服务端下发的数据 | — | — |
 | map | func | 对数据进行后处理 | — | — |
- **getMenus** 获取主框架菜单数据。
- **lifecycle** 挂载子应用的生命周期。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | app | object | 当前应用上下文(如: vue根实例) | — | — |
 | render | func | 当前渲染函数(基于vue或react) | — | — |
 | rootApp | object | 当前应用的根组件(可能是对象或组件) | — | — |
 | options | object | 当前扩展配置 | — | {el,init,router,store,i18n,plugins,content,loading,cookie,fastclick,lazy} |
