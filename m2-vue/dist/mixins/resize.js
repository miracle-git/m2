"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _m2Core = require("m2-core");

var _default = {
  mounted: function mounted() {
    var _this2 = this;

    window.addEventListener('resize', function () {
      _this2.resize(_this2);
    });
  },
  methods: {
    resize: _m2Core.DataEvent.debounce(function (_this) {
      _this.$bus.$emit(_m2Core.WINDOW_SCREEN_RESIZE, document.body.clientWidth);
    })
  }
};
exports["default"] = _default;