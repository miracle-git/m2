"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _m2Core = require("m2-core");

/**
 * @file 封装connect高阶组件
 * @author Miracle He
 * @version v1.0.0
 * @description 可根据当前状态和操作来包装
 * @createDate 2019-01-24
 */

/**
 * @method 基于connect高阶包装连接Redux与Store
 * @param {Object} reducers 当前的Reducer键值字符串或数组(来源于root reducer配置)，如只有一个键值则直接赋值即可
 * @param {Object} actions 当前的操作函数对象
 * @param {Object} types 当前组件需要的字典类型
 * @returns {String} 返回connect高阶包装后的组件
 */
var connect = function connect(_ref) {
  var reducers = _ref.reducers,
      actions = _ref.actions,
      types = _ref.types;
  return (0, _reactRedux.connect)(function (state) {
    var result = {};

    if (reducers !== undefined) {
      var _reducers = reducers;

      if (_m2Core.DataType.isString(reducers)) {
        _reducers = reducers.split(',');
      } else if (_m2Core.DataType.isArray(reducers)) {
        _reducers = reducers;
      }

      _reducers.forEach(function (item) {
        return _m2Core.DataType.isString(item) && (result[item] = state[item]);
      });
    }

    if (types !== undefined) {
      var _types = types;

      var _dict = state.common && state.common.dictionary ? state.common.dictionary.data || state.common.dictionary : [];

      if (_m2Core.DataType.isString(types)) {
        _types = types.split(',');
      } else if (_m2Core.DataType.isArray(types)) {
        _types = types;
      }

      result.dict = {};

      if (!_m2Core.DataType.isArray(_dict)) {
        _dict = [];
      }

      _types.forEach(function (type) {
        if (_m2Core.DataType.isString(type)) {
          var items = _m2Core.DataUtil.getDictItems(_dict, type);

          result.dict[type] = {
            items: items
          };
          items.forEach(function (item) {
            return result.dict[type][item.key] = item.value;
          });
        }
      });
    }

    return result;
  }, function (dispatch) {
    var result = {};

    if (actions !== undefined) {
      for (var prop in actions) {
        result[prop] = (0, _redux.bindActionCreators)(actions[prop], dispatch);
      }
    }

    return result;
  }, null, {
    withRef: true
  });
};

exports.connect = connect;