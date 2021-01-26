import { DataEvent, WINDOW_SCREEN_RESIZE } from 'm2-core'

export default {
  mounted() {
    window.addEventListener('resize', () => {
      this.resize(this)
    })
  },
  methods: {
    resize: DataEvent.debounce((_this) => {
      _this.$bus.$emit(WINDOW_SCREEN_RESIZE, document.body.clientWidth)
    })
  }
}
