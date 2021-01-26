import { WINDOW_SCREEN_RESIZE } from 'm2-core'

export default {
  created() {
    this.$bus.$on(WINDOW_SCREEN_RESIZE, screenWidth => {
      this.updateLayout(screenWidth)
    })
  },
  mounted() {
    this.updateLayout(document.body.clientWidth)
  },
  methods: {
    initGridLayout(count = 0) {
      const sizes = [
        { size: 'xs', width: 24 }, // < 768
        { size: 'sm', width: 12 }, // 768 ~ 992
        { size: 'md', width: 12 }, // 992 ~ 1200
        { size: 'lg', width: 8 }, // 1200 ~ 1800
        { size: 'xl', width: 6 } // > 1800
      ]
      return {
        search: sizes.reduce((res, item) => (
          { ...res, [item.size]: Array(count).fill(item.width) }), {})
      }
    },
    updateLayout(screenWidth) {
      Object.keys(this.grid || {}).forEach(item => {
        const { xs, sm, md, lg, xl } = this.grid[item]
        let current
        if (screenWidth <= 768) {
          current = xs || md
        } else if (screenWidth <= 992) {
          current = sm || xs || md
        } else if (screenWidth <= 1200) {
          current = md
        } else if (screenWidth <= 1800) {
          current = lg || md
        } else {
          current = xl || lg || md
        }
        // 如果查找到对应的布局则继续处理
        if (current && current.length) {
          for (let i = 1; i <= current.length; i++) {
            this.$set(this.grid[item], `$${i}`, current[i - 1])
          }
        }
      })
    }
  }
}
