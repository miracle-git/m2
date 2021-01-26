<template>
  <el-card class="m2-query-panel">
    <el-form ref="form" :inline="isInline" :model="form" :label-width="labelWidth" :class="formClass">
      <div class="content" v-show="showPanel">
        <slot/>
      </div>
      <el-form-item v-if="isInline" class="action">
        <el-button type="primary" size="small" @click="handleQuery">{{queryText || $st('m2.queryPanel.query')}}</el-button>
        <el-button type="default" size="small" @click="resetForm">{{resetText || $st('m2.queryPanel.reset')}}</el-button>
      </el-form-item>
      <el-row class="action" :class="actionClass" v-if="isBlock">
        <el-col :span="4">
          <span class="expand-icon" @click="showPanel=!showPanel"><i :class="iconClass"></i></span>
        </el-col>
        <el-col :span="20">
          <el-button type="primary" size="small" @click="handleQuery">{{queryText || $st('m2.queryPanel.query')}}</el-button>
          <el-button type="default" size="small" @click="resetForm">{{resetText || $st('m2.queryPanel.reset')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import { oneOf } from 'm2-webui/src/utils/main'
  import { CLEAR_QUERY_FORM } from 'm2-webui/src/config/constant'
  import { locale } from 'mixins'

  export default {
    name: 'm2-query-panel',
    mixins: [locale],
    props: {
      mode: {
        type: String,
        default: 'block', // block, inline
        validator(val) {
          return oneOf(val, ['block', 'inline'], 'mode')
        }
      },
      form: {
        type: Object,
        default() {
          return {}
        }
      },
      pager: {
        type: Object,
        default() {
          return {}
        }
      },
      queryEvent: {
        type: String,
        default: 'query'
      },
      labelWidth: {
        type: String,
        default: '80px'
      },
      grid: {
        type: Object,
        default() {
          return {}
        }
      },
      queryText: {
        type: String,
        default: ''
      },
      resetText: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showPanel: true
      }
    },
    computed: {
      formClass() {
        return this.isBlock ? 'el-form--block' : ''
      },
      iconClass() {
        return this.showPanel ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
      },
      actionClass() {
        return this.showPanel ? 'expand' : ''
      },
      isBlock() {
        return this.mode === 'block'
      },
      isInline() {
        return this.mode === 'inline'
      }
    },
    methods: {
      handleQuery() {
        this.$bus.$emit(this.queryEvent, {
          pageIndex: 1,
          pageSize: this.pager.size
        })
      },
      resetForm() {
        this.$nextTick(() => {
          this.$bus.$emit(CLEAR_QUERY_FORM, this.form)
          this.$refs.form.resetFields()
        })
      }
    }
  }
</script>
