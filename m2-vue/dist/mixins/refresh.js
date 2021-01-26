"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _m2Core = require("m2-core");

var _default = {
  created: function created() {
    var _this = this;

    this.$bus.$on(_m2Core.REFRESH_APP_LAYOUT, function () {
      _this.layoutKey = _m2Core.DataUtil.randomString(10);
    });
  },
  data: function data() {
    return {
      layoutKey: ''
    };
  }
};
exports["default"] = _default;