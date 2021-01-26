"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _m2Core = require("m2-core");

var _default = {
  name: 'permission',
  rule: function rule(store) {
    return {
      // 指令已经添加到元素上，el-指令相关dom元素；binding-对象
      // binding: {name:'if', expression:'foo==1', value: true}
      // v-permission="['admin','editor']"
      inserted: function inserted(el, binding) {
        // 获取指令的值：按钮要求的权限点数组value并取别名perms
        var perms = binding.value; // 获取用户的权限点

        var accessPerms = store.getters && store.getters.perms;

        if (!_m2Core.DataType.isEmptyArray(accessPerms)) {
          // 判断用户权限点中是否有按钮要求的权限
          var hasPermission = accessPerms.some(function (item) {
            return perms.includes(item);
          }); // 如果没有权限则删除当前dom

          if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el);
          }
        } else {
          throw new Error("The permission code is required\uFF0Ceg: v-permission=\"['admin','editor']\"");
        }
      }
    };
  }
};
exports["default"] = _default;