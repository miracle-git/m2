export default {
  data: () => ({
    fixedConfig: {
      direction: 'top', // 可配置在哪里驻留位置(top,bottom)
      scrollTop: 0, // 鼠标滑动时参照物距浏览器顶部的距离
      isFixed: false // 是否需要固定元素
    }
  }),
  computed: {
    isFixed() {
      return this.fixedConfig.isFixed
    }
  },
  methods: {
    initPageHeight() {
      const { direction, scrollTop } = this.fixedConfig
      if (direction !== 'top' && direction !== 'bottom') return
      const position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.fixedConfig.isFixed = direction === 'top' ? position > scrollTop : position < scrollTop
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initPageHeight)
  },
  destroyed() {
    window.removeEventListener('scroll', this.initPageHeight, false)
  }
}
