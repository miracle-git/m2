export default {
  data() {
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
    }
  },
  computed: {
    params() {
      return { ...this.search, pageIndex: this.pager.current, pageSize: this.pager.size }
    }
  },
  created() {
    this.auto && this.getDataList()
    this.$bus.$on(this.queryEvent, this.getPageDataList)
    this.$bus.$on(this.pager.event || this.pagerEvent, this.getPageDataList)
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
  }
}
