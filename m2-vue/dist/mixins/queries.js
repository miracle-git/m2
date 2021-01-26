"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  data: function data() {
    return {
      queryTypes: {}
    };
  },
  created: function created() {
    var _this = this;

    Object.keys(this.queryTypes).map(function (key) {
      var item = _this.queryTypes[key];
      item.params = _objectSpread(_objectSpread({}, item.params), {}, {
        pageIndex: item.pager.current,
        pageSize: item.pager.size
      });
      item.auto && item.list && item.list.query();

      _this.$bus.$on(item.list.event || 'query', function (pager) {
        return _this.getPageDataList(item, pager);
      });

      _this.$bus.$on(item.pager.event || 'pager-change', function (pager) {
        return _this.getPageDataList(item, pager);
      });
    });
  },
  methods: {
    getPageDataList: function getPageDataList(item, pager) {
      item.pager.current = pager.pageIndex;
      item.pager.size = pager.pageSize;
      item.params = _objectSpread(_objectSpread({}, item.params), pager);
      item.list.query();
    }
  },
  destroyed: function destroyed() {
    var _this2 = this;

    Object.keys(this.queryTypes).map(function (key) {
      var item = _this2.queryTypes[key];

      _this2.$bus.$off(item.list.event || 'query', function (pager) {
        return _this2.getPageDataList(item, pager);
      });

      _this2.$bus.$off(item.pager.event || 'pager-change', function (pager) {
        return _this2.getPageDataList(item, pager);
      });
    });
  }
};
exports["default"] = _default;