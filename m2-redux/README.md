# m2-redux

[![](https://img.shields.io/badge/m2--redux-v1.1.8-green.svg)](https://github.com/hmiinyu/m2-redux.git) <br/>
The package is provided factory and utilities based on redux.

You can learning the M2 architecture via visiting: 
https://app.yinxiang.com/fx/c541e662-a573-47e0-af9c-b98d4ca52714

### Usage
 - Install
```bash
npm install m2-redux
yarn add m2-redux
```
### APIs
- `Root` **class** The application Root component with react and redux, will connect the store and router.
 ```js
 import React from 'react'
 import { render } from 'm2-react'
 import { Root } from 'm2-redux'
 import Loading from '@/features/common/components/loading'
 import AppRouter from '@/features/app/router' 
 import AppStore from '@/features/app/redux/store'
 
 /* 有以下几种使用方式: */
 // 1. 通过Redux Root组件渲染
 render(
   <Root {...AppStore} {...AppRouter}/>
 )
 
 // 2. 通过Redux Root组件渲染多组件(使用components属性)
 render({
   components: [
     <Loading key="loading"/>,
     <Root {...AppStore} {...AppRouter} key="root"/>
   ],
   root: 'app' // 指定DOM根元素id,默认为'root'
 })
```
- connect **function** Encapsulate connect from 'react-redux' and provide "reducers", "actions" and "types" options.
 ####
 | param | type | description | default | example |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | reducers | string/array | redux feature name(s) |  | 'home', ['home', 'auth'], ['home,auth'] |
 | actions | object | redux action(s) from the feature |  | { getDataList, getDictList } 
 | types | string/array | dictionary name(s) |  | 'gender', ['userType', 'gender'], ['userType,gender'] |
```js
import React from 'react'
import { connect } from 'm2-redux'
import { getDataList, getDictList } from '@/features/home/redux/actions'
import './index.less'

@connect({ reducers: ['home', 'auth'], actions: { getDataList, getDictList } })
class HomePage extends React.Component {
  // ...
  componentDidMount() {
    const { getDataList, getDictList } = this.props
    getDataList()
    getDictList()
  }
  
  render() {
    const { home, auth } = this.props
    return (
      <div>
        { home.list } -- { auth.user }
      </div>
    )
  }
}
```
- ReduxFactory **class** The factory will create store, initialState, actionType, action(sync/async), reducer(sync/async/feature/app).
#### 
| prop or func | type | description | 
| ------------ | ------------ | ------------ |
| createStore | func | create the redux store with the params **rootReducer**, {**configThunk**, **routeType**, **defaultRoute**, **middlewares**}(eg: thunk,saga,logger) |
| createInitialState | func | create the initialState based on feature reducer with the params **config** |
| createActionType | func | create the action type with the params **config** (for emit async event) |
| createAction | func | create the sync action with the params **params{config,actionKey[,actionType]}**,**payload**  |
| createAsyncAction | func | create the async action with the params **promise**,**params{config,actionKey[,actionType]}**,**handler** |
| createReducer | func | create the sync reducer with the params **state**,**action**,**params{config,actionKey[,actionType]}**,**handler** |
| createAsyncReducer | func | create the async reducer with the params **state**,**action**,**params{config,actionKey[,actionType,resultField]}** |
| createFeatureReducer | func | create the feature reducer with the params **reducers**,**state**,**reducer**,**handler** |
| createAppReducer | func | create the app reducer with the params **reducers**,**state**,**reducer** | 
| clearRedux | func | clear all redux data(only when user will exit the app) |
```js
// create the store
import { ReduxFactory } from 'm2-redux'
import rootReducer from '@/features/app/redux/reducers'

const store = ReduxFactory.createStore(rootReducer, { defaultRoute: 'home', configLogger: true })
const checkIsAuth = () => store.getState().auth.loginUser.authenticated

export default {
  store,
  checkIsAuth
}

// create the action & reducer (sync)
import { ReduxFactory } from 'm2-redux'
import config from '@/features/home/redux/config'

const params = { config, actionKey: 'list' }

export const action = () => ReduxFactory.createAction(params)
export const reducer = (state, action) => ReduxFactory.createReducer(state, action, params, () => action.payload)

// create the action & reducer (async)
import { ReduxFactory } from 'm2-redux'
import config from '@/features/common/redux/config'
import { commonService } from '@/features/app/service'

const params = { config, actionKey: 'dict' }
const promise = commonService.getDictList

export const action = () => ReduxFactory.createAsyncAction(promise, params)
export const reducer = (state, action) => ReduxFactory.createAsyncReducer(state, action, params)
export const type = ReduxFactory.createActionType(params)

// create the feature reducer
import { ReduxFactory } from 'm2-redux'
import { reducer as getDataListReducer } from '@/features/home/redux/controllers/getDataList'
import { reducer as getDataItemReducer } from '@/features/home/redux/controllers/getDataItem'
import config from '@/features/home/redux/config'

const reducers = [
  getDataListReducer,
  getDataItemReducer
]

const initialState = ReduxFactory.createInitialState(config)

export default (state = initialState, action) => ReduxFactory.createFeatureReducer(reducers, state, action)

// create the app reducer
import { ReduxFactory } from 'm2-redux'
import commonReducer from '@/features/common/redux/reducers'
import homeReducer from '@/features/home/redux/reducers'
import authReducer from '@/features/auth/redux/reducers'

const reducerMap = {
  common: commonReducer,
  home: homeReducer,
  auth: authReducer
}

export default (state, action) => ReduxFactory.createAppReducer(reducerMap, state, action)
```
- Root **class** The root component integrate Router, Store by Provider.
#### 
| prop or func | type | description | 
| ------------ | ------------ | ------------ |
| store | object | the app redux store created by ReduxFactory |
| routes | array | the app router included all component routes |
| routeType | string | the route type default as 'hash' |
| checkIsAuth | func | check if the user is authenticated |
| redirectUrl | string | if the user isn't authenticated, it will redirect the page (usually login) |
| redirect404 | string | if the route doesn't be matched, it will redirect the page (usually 404) |
