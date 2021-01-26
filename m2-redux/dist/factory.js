"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxFactory = void 0;

var _redux = require("redux");

var _reactRouterRedux = require("react-router-redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _m2Core = require("m2-core");

var _m2React = require("m2-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @method Redux工厂的私有方法集
 * @param {Object} [Required] config 当前feature的Redux配置文件
 * @param {String} [Required] actionKey 配置当前的操作key值(来源于Redux配置文件actionsKeys的某个key值)
 * @param {String} [Optional] actionType 配置当前的操作类型(针对某个操作key的多种业务场景时使用)
 */
var _redux_core = {
  _actionType: function _actionType(config, actionKey, actionType) {
    var feature = config.feature,
        actionKeys = config.actionKeys;
    var action = actionKeys.find(function (item) {
      return item.key === actionKey;
    });

    if (!action) {
      console.warn("\u672A\u80FD\u5728\u5F53\u524Dfeature\u4E0B\u7684Redux\u7684\u914D\u7F6E\u6587\u4EF6\u4E2D\u627E\u5230\u5BF9\u5E94\u7684actionKey:".concat(actionKey));
      return '';
    }

    var result = actionType ? "".concat(action.key, "_").concat(actionType) : action.key;
    return feature ? "".concat(feature, "_").concat(result) : result;
  },
  _getConfigItem: function _getConfigItem(config, actionKey, name) {
    var configItem = config.actionKeys.find(function (item) {
      return item.key === actionKey;
    });
    if (configItem && configItem[name]) return configItem[name];
    return false;
  },
  _cacheState: function _cacheState(config, actionKey, value) {
    if (_redux_core._getConfigItem(config, actionKey, 'cache')) {
      var _actionType = _redux_core._actionType(config, actionKey);

      _m2Core.DataStorage.set("".concat(_redux_core._redux_prefix, ":").concat(_actionType), value, {
        encryptType: _m2Core.SYMMETRIC_CRYPTO_TYPE.DES
      });
    }
  },
  _getState: function _getState(config, actionKey, value) {
    if (_redux_core._getConfigItem(config, actionKey, 'cache')) {
      var _actionType = _redux_core._actionType(config, actionKey);

      return _m2Core.DataStorage.get("".concat(_redux_core._redux_prefix, ":").concat(_actionType), {
        encryptType: _m2Core.SYMMETRIC_CRYPTO_TYPE.DES
      }) || value;
    }

    return value;
  },
  _resetState: function _resetState(config) {
    var state = {};
    var cacheKeys = config.actionKeys.filter(function (item) {
      return item.cache;
    });

    if (cacheKeys.length) {
      var _actionType = _redux_core._actionType(config, cacheKeys[0].key);

      var _value = _m2Core.DataStorage.get("".concat(_redux_core._redux_prefix, ":").concat(_actionType), {
        encryptType: _m2Core.SYMMETRIC_CRYPTO_TYPE.DES
      });

      if (!_value) {
        cacheKeys.forEach(function (item) {
          state[item.key] = item.data;
        });
      }
    }

    return state;
  },
  _redux_prefix: '@@redux/m2',
  _reset_state: '@@redux/INIT'
};

var ReduxFactory =
/*#__PURE__*/
function () {
  function ReduxFactory() {
    _classCallCheck(this, ReduxFactory);
  }

  _createClass(ReduxFactory, null, [{
    key: "createStore",

    /**
     * @method 创建应用的Store(内部自动集成 Redux Dev Tools)
     * @param {Object} [Required] rootReducer 当前应用的根Reducer
     * @param {Boolean} [Optional] configThunk 配置thunk(默认为true)
     * @param {Boolean} [Optional] configLogger 配置logger(默认为false)
     * @param {String} [Optional] defaultRoute 默认路由(默认为'')
     * @param {String} [Optional] routeType 路由类型(默认为hash)
     * @param {Array} [Optional] middlewares 中间件配置(非必需，如：thunk,logger))
     */
    value: function createStore(rootReducer) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$configThunk = _ref.configThunk,
          configThunk = _ref$configThunk === void 0 ? true : _ref$configThunk,
          _ref$configLogger = _ref.configLogger,
          configLogger = _ref$configLogger === void 0 ? false : _ref$configLogger,
          _ref$defaultRoute = _ref.defaultRoute,
          defaultRoute = _ref$defaultRoute === void 0 ? '' : _ref$defaultRoute,
          _ref$routeType = _ref.routeType,
          routeType = _ref$routeType === void 0 ? 'hash' : _ref$routeType,
          _ref$middlewares = _ref.middlewares,
          middlewares = _ref$middlewares === void 0 ? [] : _ref$middlewares;

      var history = (0, _m2React.createHistory)(routeType);
      defaultRoute && history.replace(defaultRoute);
      var enhancer,
          middleware = [(0, _reactRouterRedux.routerMiddleware)(history)].concat(middlewares);

      if (configThunk) {
        middleware = [].concat(_toConsumableArray(middleware), [_reduxThunk["default"]]);
      }

      if (_m2Core.IsDev && configLogger) {
        middleware = [].concat(_toConsumableArray(middleware), [_reduxLogger["default"]]);
      }

      if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancer = (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, _toConsumableArray(middleware)), window.__REDUX_DEVTOOLS_EXTENSION__());
      } else {
        enhancer = _redux.applyMiddleware.apply(void 0, _toConsumableArray(middleware));
      }

      return (0, _redux.createStore)(rootReducer, enhancer);
    }
    /**
     * @method 创建基于feature的初始状态initialState
     * @param {Object} config 当前feature的Redux配置文件
     */

  }, {
    key: "createInitialState",
    value: function createInitialState(config) {
      var initialState = {};
      if (!_m2Core.DataType.isObject(config) || !_m2Core.DataType.isArray(config.actionKeys)) return initialState;
      config.actionKeys.forEach(function (item) {
        item.state = item.data;

        if (item.async) {
          item.state = {
            data: item.data,
            pending: false,
            error: null
          };
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

  }, {
    key: "createActionType",
    value: function createActionType(_ref2) {
      var config = _ref2.config,
          actionKey = _ref2.actionKey,
          _ref2$actionType = _ref2.actionType,
          actionType = _ref2$actionType === void 0 ? '' : _ref2$actionType;
      return _redux_core._actionType(config, actionKey, actionType);
    }
    /**
     * @method 创建基于单一操作的同步action
     * @param {Object} config 当前feature的Redux配置文件
     * @param {String} actionKey 当前关注的actionKey(来源于配置文件的key值)
     * @param {String} actionType 如需对同一actionKey应用不同的业务场景时配置(默认为空，非必需)
     * @param payload 当前操作需要传递的参数(非必需，大多数业务场景下需要传递)
     */

  }, {
    key: "createAction",
    value: function createAction() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          config = _ref3.config,
          actionKey = _ref3.actionKey,
          _ref3$actionType = _ref3.actionType,
          actionType = _ref3$actionType === void 0 ? '' : _ref3$actionType;

      var payload = arguments.length > 1 ? arguments[1] : undefined;
      return {
        type: _redux_core._actionType(config, actionKey, actionType),
        payload: payload
      };
    }
    /**
     * @method 清除Redux中缓存的数据(当用户注销或需手动清除时调用)
     */

  }, {
    key: "clearRedux",
    value: function clearRedux() {
      return {
        type: _redux_core._reset_state
      };
    }
    /**
     * @method 创建基于单一操作的异步action
     * @param {Promise}} promise 当前的异步操作(必须是Promise类型,分离Redux与Promise实现)
     * @param {Object} config 当前feature的Redux配置文件
     * @param {String} actionKey 当前关注的actionKey(来源于配置文件的key值)
     * @param {String} actionType 如需对同一actionKey应用不同的业务场景时配置(默认为空，非必需)
     * @param {Function} handler 当前业务处理函数(非必需，只有当对promise返回数据进行二次处理才会传递)
     */

  }, {
    key: "createAsyncAction",
    value: function createAsyncAction(promise) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          config = _ref4.config,
          actionKey = _ref4.actionKey,
          _ref4$actionType = _ref4.actionType,
          actionType = _ref4$actionType === void 0 ? '' : _ref4$actionType;

      var handler = arguments.length > 2 ? arguments[2] : undefined;
      if (!_m2Core.DataType.isFunction(promise)) return;

      var _actionType = _redux_core._actionType(config, actionKey, actionType);

      return function (dispatch) {
        dispatch({
          type: "".concat(_actionType, "_startup")
        });
        promise().then(function (res) {
          var data = res;

          if (_m2Core.DataType.isFunction(handler)) {
            data = handler(res);
          }

          dispatch({
            type: "".concat(_actionType, "_success"),
            payload: data
          });
        }, function (err) {
          dispatch({
            type: "".concat(_actionType, "_failure"),
            payload: {
              err: err
            }
          });
        });
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

  }, {
    key: "createReducer",
    value: function createReducer(state, action) {
      var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          config = _ref5.config,
          actionKey = _ref5.actionKey,
          _ref5$actionType = _ref5.actionType,
          actionType = _ref5$actionType === void 0 ? '' : _ref5$actionType;

      var handler = arguments.length > 3 ? arguments[3] : undefined;

      var _actionType = _redux_core._actionType(config, actionKey, actionType);

      var _stateItem = state[actionKey];

      switch (action.type) {
        case _actionType:
          if (_m2Core.DataType.isFunction(handler)) {
            _stateItem = handler();
          } // 保存到storage中


          _redux_core._cacheState(config, actionKey, _stateItem);

          return _objectSpread({}, state, _defineProperty({}, actionKey, _stateItem));

        case _redux_core._reset_state:
          return _objectSpread({}, state, _redux_core._resetState(config));

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

  }, {
    key: "createAsyncReducer",
    value: function createAsyncReducer(state, action) {
      var _objectSpread4;

      var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          config = _ref6.config,
          actionKey = _ref6.actionKey,
          _ref6$actionType = _ref6.actionType,
          actionType = _ref6$actionType === void 0 ? '' : _ref6$actionType,
          _ref6$resultField = _ref6.resultField,
          resultField = _ref6$resultField === void 0 ? 'data' : _ref6$resultField;

      var _actionType = _redux_core._actionType(config, actionKey, actionType);

      var _stateItem = state[actionKey];

      switch (action.type) {
        case _actionType + '_startup':
          _stateItem = _objectSpread({}, _stateItem, {
            pending: true,
            error: null
          }); // 保存到storage中

          _redux_core._cacheState(config, actionKey, _stateItem);

          return _objectSpread({}, state, _defineProperty({}, actionKey, _stateItem));

        case _actionType + '_success':
          _stateItem = _objectSpread({}, _stateItem, (_objectSpread4 = {}, _defineProperty(_objectSpread4, resultField, action.payload), _defineProperty(_objectSpread4, "pending", false), _defineProperty(_objectSpread4, "error", null), _objectSpread4));

          if (_redux_core._getConfigItem(config, actionKey, 'emit')) {
            _m2Core.DataBus.emit(_actionType, _stateItem);
          } // 保存到storage中


          _redux_core._cacheState(config, actionKey, _stateItem);

          return _objectSpread({}, state, _defineProperty({}, actionKey, _stateItem));

        case _actionType + '_failure':
          _stateItem = _objectSpread({}, _stateItem, {
            pending: false,
            error: action.payload.err
          }); // 保存到storage中

          _redux_core._cacheState(config, actionKey, _stateItem);

          return _objectSpread({}, state, _defineProperty({}, actionKey, _stateItem));

        case _redux_core._reset_state:
          return _objectSpread({}, state, _redux_core._resetState(config));

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

  }, {
    key: "createFeatureReducer",
    value: function createFeatureReducer(reducers, state, action) {
      var handler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
      var newState;
      _m2Core.DataType.isFunction(handler) && handler(state, action);

      switch (action.type) {
        // handle cross-topic actions here
        default:
          newState = state;
          break;
      }

      return reducers.reduce(function (s, r) {
        return r(s, action);
      }, newState);
    }
    /**
     * @method 创建基于应用的reducer
     * @param reducers 当前操作的reducer集合
     * @param state 当前状态数据
     * @param action 当前操作
     */

  }, {
    key: "createAppReducer",
    value: function createAppReducer(reducers, state, action) {
      var appReducer = (0, _redux.combineReducers)(_objectSpread({}, reducers, {
        router: _reactRouterRedux.routerReducer
      }));

      if (action.type === _redux_core._reset_state) {
        state = undefined;

        _m2Core.DataStorage.clear();

        _m2Core.DataStorage.clear(_m2Core.STORAGE_TYPE.Session);
      }

      return appReducer(state, action);
    }
  }]);

  return ReduxFactory;
}();

exports.ReduxFactory = ReduxFactory;