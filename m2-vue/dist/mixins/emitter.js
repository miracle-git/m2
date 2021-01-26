"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  methods: {
    dispatch: function dispatch(name, data) {
      var parent = this.$parent;

      while (parent) {
        parent.$emit(name, data);
        parent = parent.$parent;
      }
    },
    broadcast: function broadcast(name, data) {
      var _this = this;

      this.$children.forEach(function (item) {
        item.$emit(name, data);

        if (item.$children && item.$children.length) {
          _this.broadcast.call(item, name, data);
        }
      });
    }
  }
};
exports["default"] = _default;