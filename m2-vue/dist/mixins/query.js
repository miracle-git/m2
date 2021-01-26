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
      auto: true,
      queryEvent: 'query',
      pagerEvent: 'pager-change',
      search: {},
      pager: {
        total: 0,
        current: 1,
        size: 20
      }
    };
  },
  computed: {
    params: function params() {
      return _objectSpread(_objectSpread({}, this.search), {}, {
        pageIndex: this.pager.current,
        pageSize: this.pager.size
      });
    }
  },
  created: function created() {
    this.auto && this.getDataList();
    this.$bus.$on(this.queryEvent, this.getPageDataList);
    this.$bus.$on(this.pager.event || this.pagerEvent, this.getPageDataList);
  },
  methods: {
    getPageDataList: function getPageDataList(pager) {
      this.pager.current = pager.pageIndex;
      this.pager.size = pager.pageSize;
      this.getDataList();
    }
  },
  destroyed: function destroyed() {
    this.$bus.$off(this.queryEvent, this.getPageDataList);
    this.$bus.$off(this.pager.event || this.pagerEvent, this.getPageDataList);
  }
};
exports["default"] = _default;