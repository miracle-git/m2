# m2-react

[![](https://img.shields.io/badge/m2--react-v1.1.6-green.svg)](https://github.com/hmiinyu/m2-react.git) <br/>
The package is provided facilities and utilities based on react.

You can learning the M2 React & Redux architecture via visiting: 
https://app.yinxiang.com/fx/c541e662-a573-47e0-af9c-b98d4ca52714

### Usage
 - Install
```bash
npm install m2-react
yarn add m2-react
```
### APIs
 - `render` **function** Render the root component(s) with the param *rootApp*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | rootApp | object | the root component(s)|  |
 ```js
 import React from 'react'
 import { render } from 'm2-react'
 import Loading from '@/features/common/components/loading'
 // only for react app
 import App from '@/features/app/containers' 
 // only for redux app
 import { Root } from 'm2-redux'
 import AppRouter from '@/features/app/router' 
 import AppStore from '@/features/app/redux/store'
 
 /* 有以下几种使用方式: */
 // 1. 不通过Redux Root组件渲染
 render (
   <App/>
 )
 
 // 2. 不通过Redux Root组件渲染，同时指定根节点(使用component属性)
 render({
   component: <App/>,
   root: 'app' 
 })
 
 // 3. 通过Redux Root组件渲染
 render(
   <Root {...AppStore} {...AppRouter}/>
 )
 
 // 4. 通过Redux Root组件渲染多组件(使用components属性)
 render({
   components: [
     <Loading key="loading"/>,
     <Root {...AppStore} {...AppRouter} key="root"/>
   ],
   root: 'app' // 指定DOM根元素id,默认为'root'
 })
```
 - `getComponentRef` **function** Get the child component instance with the param *refKey* and *parent*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | refKey | string | the ref key for child component |  | 'child' |
 | parent | object | current component |  | this |
```js
import React from 'react'
import { getComponentRef } from 'm2-react'

export default class MyComponent extends React.Component {
  componentDidMount() {
    this.child = getComponentRef('child', this)
  }

  render() {
    return (
      <>
        <child-component ref="child"/>
        <child-component ref={el=>this.child=el}/> { /* Recommend */ }
        <child-component wrappedComponentRef={form=>this.child=form}/>
      </>
    )
  }
}
```
 - `initialFormComponent` **function** Initial the form component for extended on rc-form with the param *component*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | component | object | current react component |  | 'initialFormComponent(this)' |
```js
 import React from 'react'
 import { createForm } from 'rc-form'
 import { Button } from 'antd-mobile'
 import { PickerItem } from 'm2-antd/mobile' /* 待发布(可用其他组件代替) */
 import { initialFormComponent } from 'm2-react'
 import { district } from 'antd-mobile-demo-data'

 class AppForm extends React.Component {
  componentWillMount() {
    initialFormComponent(this)
  }
  
  submit() {
    console.log(this.form.values)  
  }
  
  render() {
   return (
     <div className="App">
      <PickerItem label="Select District" data={district} field="district" {...this.form}/>
      <Button onClick={()=>this.submit()}>Submit</Button>
     </div>
    ) 
  }
 }
 
 export default createForm()(AppForm)
 
```
 - `loadRoutesConfig` **function** Load the application router configuration with the param *rootApp*,*childRoutes* and *context*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | rootApp | string | the root component |  | 'App' |
 | childRoutes | array | the router configuration |  |  |
 | context | string | the context path | '/' |  |
```js
import { loadRoutesConfig } from 'm2-react'
import App from '@/features/app/containers'
import commonRouter from '@/features/common/router'
import homeRouter from '@/features/home/router'
// 如增加新的业务模块，需在此注册
// import authRouter from '@/features/auth/router'

// 支持单一布局的配置(不需要单独配置layouts, 只需要App作为容器即可)
const routes = loadRoutesConfig(App, [
  commonRouter,
  homeRouter,
// authRouter
])

export default {
  routes,
  routeType: 'hash',
  redirectUrl: '/auth',
  redirect404: '/404'
}
```
 - `loadLayoutRoutesConfig` **function** Load the application router configuration based on multi-layout with the param *layouts*,*childRoutes*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | layouts | array | the layouts configuration |  | 'App' |
 | childRoutes | array | the router configuration |  |  |
```js
import { loadLayoutRoutesConfig } from 'm2-react'
import layouts from '@/features/app/layouts'
import commonRouter from '@/features/common/router'
import homeRouter from '@/features/home/router'
// 如增加新的业务模块，需在此注册
// import authRouter from '@/features/auth/router'

// 支持多布局(需要配置layouts, 并在feature的router中根据需要设置layout即可)
const routes = loadLayoutRoutesConfig(layouts, [
  commonRouter,
  homeRouter,
  // 同时添加到路由集合
  // authRouter
])

export default {
  routes,
  routeType: 'hash', // 路由类型('hash','browser')
  redirectUrl: '/auth', // 用户未通过登录认证导航的页面(一般指向登录页面)
  redirect404: '/404' // 当路由未找到匹配时导航的页面(一般指向404)
}
```
 - `renderRoutes` **function** Render the Routes based on router configuration with the param *routesConfig*,*contextPath* and *configOptions*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | routesConfig | array | the routes configuration |  |  |
 | contextPath | string | the context path | '/' |  |
 | configOptions | object | the extra options | { routeType: 'hash', checkIsAuth: ()=>{}, redirectUrl: '', redirect404: ''} |  |
```
notes: the method is provided only for m2-redux to initialize Root component
```
 - `createHistory` **function** Create the hash/browser/memory history base react-router with the param *routeType*(default: 'hash').
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | routeType | string | the route type | 'hash' | |
 - `getRouteParam` **function** Get the router param value with the param *name*,*props*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | name | string | the route param name |  | 'id' |
 | props | object | the component props |  |  |
 - `getRouteQueryParam` **function** Get the query string param value with the param *name*,*props*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | name | string | the query string param name |  | 'id' |
 | props | object | the component props |  |  |
 - `getParam` **function** Get the router and query string param value with the param *name*,*props*,*query*.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | name | string | the route param name |  | 'id' |
 | props | object | the component props |  |  |
 | query | boolean | if it is a query param | false |  |

```js
// <Route path='/products/:id'/>
// http://xxx.com/products/123 
// http://xxx.com/products?id=123
getRouteParam('id', this.props) // 123
getRouteQueryParam('id', this.props) // 123
getParam('id', this.props, true) // 123
