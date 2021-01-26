<template>
  <div class="m2-search">
    <el-input :placeholder="$st('m2.layout.search.placeholder')" class="keyword"
              v-model="keyword" @keyup.enter.native="handleSearch">
      <i slot="suffix" class="el-input__icon el-icon-search" @click.stop="handleSearch"></i>
    </el-input>
  </div>
</template>

<script>
  import { DataEvent } from 'm2-core'
  import { locale } from 'mixins'

  let _this

  export default {
    name: 'm2-search',
    mixins: [locale],
    data() {
      return {
        keyword: ''
      }
    },
    created() {
      _this = this
    },
    methods: {
      handleSearch: DataEvent.debounce(() => {
        _this.keyword = _this.keyword.trim()
        if (!_this.keyword.length) return
        _this.$bus.$emit('search', _this.keyword)
      })
    }
  }
</script>
