<template>
  <div class="m2-pager" ref="pager" v-if="showPager">
    <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange"
                   background :layout="layout" :hide-on-single-page="false" :total="totalCount"
                   :current-page.sync="pageIndex" :page-sizes="pageSizes" :page-size="pageSize"/>
  </div>
</template>

<script>
  export default {
    name: 'm2-pager',
    props: {
      pager: {
        type: Object,
        default() {
          return {}
        }
      },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 50, 100]
        }
      },
      layout: {
        type: String,
        // default: 'total, sizes, prev, pager, next, jumper'
        default: 'total, prev, pager, next, jumper'
      }
    },
    computed: {
      pageIndex: {
        get() {
          return this.pager.current || 1
        },
        set(val) {
          this.pager.current = val
        }
      },
      pageSize: {
        get() {
          return this.pager.size || 20
        },
        set(val) {
          this.pager.size = val
        }
      },
      totalCount() {
        return this.pager.total || 0
      },
      showPager() {
        return this.totalCount > this.pageSize
      },
      changeEvent() {
        return this.pager.event || 'pager-change'
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageIndex = 1
        this.pageSize = val
        this.$bus.$emit(this.changeEvent, { pageIndex: this.pageIndex, pageSize: val })
      },
      handlePageChange(val) {
        this.$bus.$emit(this.changeEvent, { pageIndex: val, pageSize: this.pageSize })
      }
    }
  }
</script>
