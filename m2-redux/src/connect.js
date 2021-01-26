/**
 * @file 封装connect高阶组件
 * @author Miracle He
 * @version v1.0.0
 * @description 可根据当前状态和操作来包装
 * @createDate 2019-01-24
 */
import { connect as _connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DataType, DataUtil } from 'm2-core';
/**
 * @method 基于connect高阶包装连接Redux与Store
 * @param {Object} reducers 当前的Reducer键值字符串或数组(来源于root reducer配置)，如只有一个键值则直接赋值即可
 * @param {Object} actions 当前的操作函数对象
 * @param {Object} types 当前组件需要的字典类型
 * @returns {String} 返回connect高阶包装后的组件
 */
export const connect = ({ reducers, actions, types }) => _connect(
  state => {
    let result = {};
    if (reducers !== undefined) {
      let _reducers = reducers;
      if (DataType.isString(reducers)) {
        _reducers = reducers.split(',');
      } else if (DataType.isArray(reducers)) {
        _reducers = reducers;
      }
      _reducers.forEach(item => DataType.isString(item) && (result[item] = state[item]));
    }
    if (types !== undefined) {
      let _types = types;
      let _dict = state.common && state.common.dictionary ? (state.common.dictionary.data || state.common.dictionary) : [];
      if (DataType.isString(types)) {
        _types = types.split(',');
      } else if (DataType.isArray(types)) {
        _types = types;
      }
      result.dict = {};
      if (!DataType.isArray(_dict)) {
        _dict = [];
      }
      _types.forEach(type => {
        if (DataType.isString(type)) {
          const items = DataUtil.getDictItems(_dict, type);
          result.dict[type] = { items };
          items.forEach(item => result.dict[type][item.key] = item.value);
        }
      })
    }
    return result;
  },
  dispatch => {
    let result = {};
    if (actions !== undefined) {
      for (const prop in actions) {
        result[prop] = bindActionCreators(actions[prop], dispatch);
      }
    }
    return result;
  },
  null,
  {
    withRef: true
  }
)
