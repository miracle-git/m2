/**
 * @file 封装Redux创建工厂
 * @author Miracle He
 * @version v1.0.0
 * @description 创建Store, initialState, Action(sync/async), Reducer(sync/async)
 * @createDate 2019-01-24
 */
import { applyMiddleware, compose, combineReducers, createStore as _createStore } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { IsDev, DataBus, DataType, DataStorage, STORAGE_TYPE, SYMMETRIC_CRYPTO_TYPE } from 'm2-core';
import { createHistory } from 'm2-react';

/**
 * @method Redux工厂的私有方法集
 * @param {Object} [Required] config 当前feature的Redux配置文件
 * @param {String} [Required] actionKey 配置当前的操作key值(来源于Redux配置文件actionsKeys的某个key值)
 * @param {String} [Optional] actionType 配置当前的操作类型(针对某个操作key的多种业务场景时使用)
 */
const _redux_core = {
  _actionType: (config, actionKey, actionType) => {
    const { feature, actionKeys } = config;
    const action = actionKeys.find(item => item.key === actionKey);
    if (!action) {
      console.warn(`未能在当前feature下的Redux的配置文件中找到对应的actionKey:${actionKey}`);
      return '';
    }
    const result = actionType ? `${action.key}_${actionType}` : action.key;
    return feature ? `${feature}_${result}` : result;
  },
  _getConfigItem: (config, actionKey, name) => {
    const configItem = config.actionKeys.find(item => item.key === actionKey);
    if (configItem && configItem[name]) return configItem[name];
    return false;
  },
  _cacheState: (config, actionKey, value) => {
    if (_redux_core._getConfigItem(config, actionKey, 'cache')) {
      const _actionType = _redux_core._actionType(config, actionKey);
      DataStorage.set(`${_redux_core._redux_prefix}:${_actionType}`, value, { encryptType: SYMMETRIC_CRYPTO_TYPE.DES });
    }
  },
  _getState: (config, actionKey, value) => {
    if (_redux_core._getConfigItem(config, actionKey, 'cache')) {
      const _actionType = _redux_core._actionType(config, actionKey);
      return DataStorage.get(`${_redux_core._redux_prefix}:${_actionType}`, { encryptType: SYMMETRIC_CRYPTO_TYPE.DES }) || value;
    }
    return value;
  },
  _resetState: (config) => {
    const state = {};
    const cacheKeys = config.actionKeys.filter(item => item.cache);
    if (cacheKeys.length) {
      const _actionType = _redux_core._actionType(config, cacheKeys[0].key);
      const _value = DataStorage.get(`${_redux_core._redux_prefix}:${_actionType}`, { encryptType: SYMMETRIC_CRYPTO_TYPE.DES })
      if (!_value) {
        cacheKeys.forEach(item => {
          state[item.key] = item.data;
        });
      }
    }
    return state;
  },
  _redux_prefix: '@@redux/m2',
  _reset_state: '@@redux/INIT'
}
export class ReduxFactory {
  /**
   * @method 创建应用的Store(内部自动集成 Redux Dev Tools)
   * @param {Object} [Required] rootReducer 当前应用的根Reducer
   * @param {Boolean} [Optional] configThunk 配置thunk(默认为true)
   * @param {Boolean} [Optional] configLogger 配置logger(默认为false)
   * @param {String} [Optional] defaultRoute 默认路由(默认为'')
   * @param {String} [Optional] routeType 路由类型(默认为hash)
   * @param {Array} [Optional] middlewares 中间件配置(非必需，如：thunk,logger))
   */
  static createStore(rootReducer, { configThunk = true, configLogger = false, defaultRoute = '', routeType = 'hash', middlewares = [] } = {}) {
    const history = createHistory(routeType);
    defaultRoute && history.replace(defaultRoute);
    let enhancer, middleware = [routerMiddleware(history)].concat(middlewares);
    if (configThunk) {
      middleware = [...middleware, thunk];
    }
    if (IsDev && configLogger) {
      middleware = [...middleware, logger];
    }
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      enhancer = compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__());
    } else {
      enhancer = applyMiddleware(...middleware);
    }
    return _createStore(rootReducer, enhancer);
  }
  /**
   * @method 创建基于feature的初始状态initialState
   * @param {Object} config 当前feature的Redux配置文件
   */
  static createInitialState(config) {
    const initialState = {};
    if (!DataType.isObject(config) || !DataType.isArray(config.actionKeys)) return initialState;
    config.actionKeys.forEach(item => {
      item.state = item.data;
      if (item.async) {
        item.state = { data: item.data, pending: false, error: null };
      }
      initialState[item.key] = _redux_core._getState(config, item.key, item.state);
    });
    return initialState;
  }
  /**
   * @method 创建操作类型
   * @param {Object} config 当前feature的Redux配置文件
   * @param {String} actionKey 当前关注的actionKey(来源于配置文件的key值)
   * @param {String} actionType 如需对同一actionKey应用不同的业务场景时配置(默认为空，非必需)
   */
  static createActionType({ config, actionKey, actionType = '' }) {
    return _redux_core._actionType(config, actionKey, actionType);
  }
  /**
   * @method 创建基于单一操作的同步action
   * @param {Object} config 当前feature的Redux配置文件
   * @param {String} actionKey 当前关注的actionKey(来源于配置文件的key值)
   * @param {String} actionType 如需对同一actionKey应用不同的业务场景时配置(默认为空，非必需)
   * @param payload 当前操作需要传递的参数(非必需，大多数业务场景下需要传递)
   */
  static createAction({ config, actionKey, actionType = '' } = {}, payload) {
    return {
      type: _redux_core._actionType(config, actionKey, actionType),
      payload
    }
  }
  /**
   * @method 清除Redux中缓存的数据(当用户注销或需手动清除时调用)
   */
  static clearRedux() {
    return {
      type: _redux_core._reset_state
    }
  }
  /**
   * @method 创建基于单一操作的异步action
   * @param {Promise}} promise 当前的异步操作(必须是Promise类型,分离Redux与Promise实现)
   * @param {Object} config 当前feature的Redux配置文件
   * @param {String} actionKey 当前关注的actionKey(来源于配置文件的key值)
   * @param {String} actionType 如需对同一actionKey应用不同的业务场景时配置(默认为空，非必需)
   * @param {Function} handler 当前业务处理函数(非必需，只有当对promise返回数据进行二次处理才会传递)
   */
  static createAsyncAction(promise, { config, actionKey, actionType = '' } = {}, handler) {
    if (!DataType.isFunction(promise)) return;
    const _actionType = _redux_core._actionType(config, actionKey, actionType);
    return dispatch => {
      dispatch({
        type: `${_actionType}_startup`
      });
      promise().then(res => {
        let data = res;
        if (DataType.isFunction(handler)) {
          data = handler(res);
        }
        dispatch({
          type: `${_actionType}_success`,
          payload: data
        });
      }, err => {
        dispatch({
          type: `${_actionType}_failure`,
          payload: { err }
        });
      })
    };
  }
  /**
   * @method 创建基于单一操作的同步reducer
   * @param state 当前状态数据
   * @param action 当前操作
   * @param {Object} config 当前feature的Redux配置文件
   * @param {String} actionKey 当前关注的actionKey(来源于配置文件的key值)
   * @param {String} actionType 如需对同一actionKey应用不同的业务场景时配置(默认为空，非必需)
   * @param {Function} handler 当前业务处理函数(在同步Reducer中必须传)
   */
  static createReducer(state, action, { config, actionKey, actionType = '' } = {}, handler) {
    let _actionType = _redux_core._actionType(config, actionKey, actionType);
    let _stateItem = state[actionKey];
    switch (action.type) {
      case _actionType:
        if (DataType.isFunction(handler)) {
          _stateItem = handler();
        }
        // 保存到storage中
        _redux_core._cacheState(config, actionKey, _stateItem);
        return { ...state, [actionKey]: _stateItem };
      case _redux_core._reset_state:
        return { ...state, ..._redux_core._resetState(config) };
      default:
        return state;
    }
  }
  /**
   * @method 创建基于单一操作的异步reducer
   * @param state 当前状态数据
   * @param action 当前操作
   * @param {Object} config 当前feature的Redux配置文件
   * @param {String} actionKey 当前关注的actionKey(来源于配置文件的key值)
   * @param {String} actionType 如需对同一actionKey应用不同的业务场景时配置(默认为空，非必需)
   * @param {String} resultField 返回值字段(默认为data)
   */
  static createAsyncReducer(state, action, { config, actionKey, actionType = '', resultField = 'data' } = {}) {
    let _actionType = _redux_core._actionType(config, actionKey, actionType);
    let _stateItem = state[actionKey];
    switch (action.type) {
      case _actionType + '_startup':
        _stateItem = {
          ..._stateItem,
          pending: true,
          error: null
        };
        // 保存到storage中
        _redux_core._cacheState(config, actionKey, _stateItem);
        return { ...state, [actionKey]: _stateItem };
      case _actionType + '_success':
        _stateItem = {
          ..._stateItem,
          [resultField]: action.payload,
          pending: false,
          error: null
        };
        if (_redux_core._getConfigItem(config, actionKey, 'emit')) {
          DataBus.emit(_actionType, _stateItem);
        }
        // 保存到storage中
        _redux_core._cacheState(config, actionKey, _stateItem);
        return { ...state, [actionKey]: _stateItem };
      case _actionType + '_failure':
        _stateItem = {
          ..._stateItem,
          pending: false,
          error: action.payload.err
        };
        // 保存到storage中
        _redux_core._cacheState(config, actionKey, _stateItem);
        return { ...state, [actionKey]: _stateItem };
      case _redux_core._reset_state:
        return { ...state, ..._redux_core._resetState(config) };
      default:
        return state;
    }
  }
  /**
   * @method 创建基于feature的合并reducer
   * @param reducers 当前操作的reducer集合
   * @param state 当前状态数据
   * @param action 当前操作
   * @param handler 当前业务处理函数(非必需)
   */
  static createFeatureReducer(reducers, state, action, handler = () => {}) {
    let newState;
    DataType.isFunction(handler) && handler(state, action);
    switch(action.type) {
      // handle cross-topic actions here
      default:
        newState = state;
        break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
  }
  /**
   * @method 创建基于应用的reducer
   * @param reducers 当前操作的reducer集合
   * @param state 当前状态数据
   * @param action 当前操作
   */
  static createAppReducer(reducers, state, action) {
    const appReducer = combineReducers({
      ...reducers,
      router: routerReducer
    });
    if (action.type === _redux_core._reset_state) {
      state = undefined;
      DataStorage.clear();
      DataStorage.clear(STORAGE_TYPE.Session);
    }
    return appReducer(state, action);
  }
}
