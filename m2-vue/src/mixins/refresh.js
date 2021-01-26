import { DataUtil, REFRESH_APP_LAYOUT } from 'm2-core'

export default {
  created() {
    this.$bus.$on(REFRESH_APP_LAYOUT, () => {
      this.layoutKey = DataUtil.randomString(10)
    })
  },
  data() {
    return {
      layoutKey: ''
    }
  }
}
