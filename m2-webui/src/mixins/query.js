import { DataUtil } from 'm2-core'
import { CLEAR_QUERY_FORM } from '../config/constant'

export default {
  data() {
    return {
      auto: true,
      queryEvent: 'query',
      pagerEvent: 'pager-change',
      condition: {},
      pager: {
        total: 0,
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    params() {
      return { ...this.condition, current: this.pager.current, size: this.pager.size }
    }
  },
  created() {
    this.$data._original = this.$data._original || DataUtil.clone(this.condition)
    this.auto && this.getDataList()
    this.$bus.$on(this.queryEvent, this.getPageDataList)
    this.$bus.$on(this.pager.event || this.pagerEvent, this.getPageDataList)
    this.$bus.$on(CLEAR_QUERY_FORM, () => this.condition = this.$data._original)
  },
  methods: {
    getPageDataList(pager) {
      this.pager.current = pager.pageIndex
      this.pager.size = pager.pageSize
      this.getDataList()
    }
  },
  destroyed() {
    this.$bus.$off(this.queryEvent, this.getPageDataList)
    this.$bus.$off(this.pager.event || this.pagerEvent, this.getPageDataList)
    this.$bus.$off(CLEAR_QUERY_FORM)
  }
}
