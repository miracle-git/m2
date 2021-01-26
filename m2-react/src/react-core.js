import React from 'react';
import { render as _render } from 'react-dom';
import format from 'string-format';
import { DataType } from 'm2-core';
import * as serviceWorker from './service-worker';

export function render(rootApp) {
  if (!rootApp && !rootApp.component && !rootApp.components) {
    console.error('React根组件参数component(s)尚未配置, 应用无法启动！');
    return;
  }

  // 注入string.format
  format && format.extend(String.prototype, {});

  let _app_root = rootApp.component || rootApp;
  if (rootApp.components && !DataType.isEmptyArray(rootApp.components)) {
    const _root = [];
    rootApp.components.forEach((item) => _root.push(item));
    _app_root = (_root);
  }

  const _renderApp = (app) => {
    _render(
      app,
      document.getElementById(rootApp.root || 'root')
    )
  };

  _renderApp(_app_root);

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

/**
 * @method 获取组件的子组件的引用(包含refs, wrappedComponentRef)
 * @param {String} refKey 当前引用的子组件key(可能是ref值或form表单)
 * @param {Object} parent 当前的父组件
 * @returns {Object} 获取子组件的引用
 */
export const getComponentRef = (refKey, parent) => {
  if (!refKey || !parent) return;
  const ref = parent[refKey] || parent.refs[refKey];
  if (!ref) return;
  return ref.getWrappedInstance ? ref.getWrappedInstance() : ref;
};
/**
 * @method 基于rc-form初始化组件(扩展生成setFieldValue方法)
 * @param {Object} component 当前表单组件
 */
export const initialFormComponent = (component) => {
  component.form = { ...component.props.form, values: {}, setFieldValue: (field, val) => {
      component.form.values = { ...component.form.values, [field]: val }
  }};
};
