import { DataType } from 'm2-core'

export default {
  data: () => ({
    contentHeight: '100%',
    clientHeight: '1000px'
  }),
  computed: {
    contentStyle() {
      return this.contentHeight > 0 ? { height: this.contentHeight + 'px' } : { height: this.contentHeight }
    }
  },
  mounted() {
    this.$nextTick(() => this.initContentHeight())
  },
  methods: {
    initContentHeight() {
      this.resizeWindow()
      window.addEventListener('resize', this.resizeWindow)
    },
    resizeWindow() {
      // 获取浏览器可视区域高度
      const docEl = document.documentElement
      this.clientHeight = `${docEl.clientHeight}`
      if (DataType.isFunction(this.calculateHeight)) {
        this.contentHeight = this.calculateHeight(this.clientHeight)
      } else {
        this.contentHeight = this.clientHeight
      }
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeWindow)
  }
}
