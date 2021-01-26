"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  data: function data() {
    return {
      fixedConfig: {
        direction: 'top',
        // 可配置在哪里驻留位置(top,bottom)
        scrollTop: 0,
        // 鼠标滑动时参照物距浏览器顶部的距离
        isFixed: false // 是否需要固定元素

      }
    };
  },
  computed: {
    isFixed: function isFixed() {
      return this.fixedConfig.isFixed;
    }
  },
  methods: {
    initPageHeight: function initPageHeight() {
      var _this$fixedConfig = this.fixedConfig,
          direction = _this$fixedConfig.direction,
          scrollTop = _this$fixedConfig.scrollTop;
      if (direction !== 'top' && direction !== 'bottom') return;
      var position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.fixedConfig.isFixed = direction === 'top' ? position > scrollTop : position < scrollTop;
    }
  },
  mounted: function mounted() {
    window.addEventListener('scroll', this.initPageHeight);
  },
  destroyed: function destroyed() {
    window.removeEventListener('scroll', this.initPageHeight, false);
  }
};
exports["default"] = _default;