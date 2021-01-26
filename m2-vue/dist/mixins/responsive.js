"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _m2Core = require("m2-core");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  created: function created() {
    var _this = this;

    this.$bus.$on(_m2Core.WINDOW_SCREEN_RESIZE, function (screenWidth) {
      _this.updateLayout(screenWidth);
    });
  },
  mounted: function mounted() {
    this.updateLayout(document.body.clientWidth);
  },
  methods: {
    initGridLayout: function initGridLayout() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var sizes = [{
        size: 'xs',
        width: 24
      }, // < 768
      {
        size: 'sm',
        width: 12
      }, // 768 ~ 992
      {
        size: 'md',
        width: 12
      }, // 992 ~ 1200
      {
        size: 'lg',
        width: 8
      }, // 1200 ~ 1800
      {
        size: 'xl',
        width: 6
      } // > 1800
      ];
      return {
        search: sizes.reduce(function (res, item) {
          return _objectSpread(_objectSpread({}, res), {}, (0, _defineProperty2["default"])({}, item.size, Array(count).fill(item.width)));
        }, {})
      };
    },
    updateLayout: function updateLayout(screenWidth) {
      var _this2 = this;

      Object.keys(this.grid || {}).forEach(function (item) {
        var _this2$grid$item = _this2.grid[item],
            xs = _this2$grid$item.xs,
            sm = _this2$grid$item.sm,
            md = _this2$grid$item.md,
            lg = _this2$grid$item.lg,
            xl = _this2$grid$item.xl;
        var current;

        if (screenWidth <= 768) {
          current = xs || md;
        } else if (screenWidth <= 992) {
          current = sm || xs || md;
        } else if (screenWidth <= 1200) {
          current = md;
        } else if (screenWidth <= 1800) {
          current = lg || md;
        } else {
          current = xl || lg || md;
        } // 如果查找到对应的布局则继续处理


        if (current && current.length) {
          for (var i = 1; i <= current.length; i++) {
            _this2.$set(_this2.grid[item], "$".concat(i), current[i - 1]);
          }
        }
      });
    }
  }
};
exports["default"] = _default;