<template>
  <div class="m2-table">
    <div class="table-header" v-if="showHeader">
      <div class="left">
        <i class="el-icon-date"></i>&nbsp;{{ caption || $st('m2.table.caption') }}
      </div>
      <div class="right">
        <slot name="header"></slot>
      </div>
    </div>
    <el-table :data="data" border stripe @selection-change="handleSelectedChange" :row-class-name="rowClassName" v-bind="$attrs">
      <el-table-column v-if="checkbox" type="selection" align="center" width="50" fixed/>
      <el-table-column v-if="radio" align="center" width="50" fixed>
        <template slot-scope="scope" slot="header">
          <span class="selection-item" :data-item="scope.row" @click="handleSelectedItemChange(null)">
            <i v-if="item" class="el-icon-remove-outline"></i>
            <i v-else class="el-icon-circle-check"></i>
          </span>
        </template>
        <template slot-scope="scope">
          <el-radio v-model="item" :label="scope.row" class="selection" @change="handleSelectedItemChange"><i></i></el-radio>
        </template>
      </el-table-column>
      <el-table-column v-if="index" type="index" :label="$st('m2.table.number')" align="center" width="60" fixed>
        <template slot-scope="scope">
          <span>{{scope.$index + (pager.current - 1) * pager.size + 1}}</span>
        </template>
      </el-table-column>
      <template v-for="(item, index) in columns">
        <el-table-column :key="index" :prop="item.prop" :label="item.label" :width="item.width || 'auto'" header-align="center"
                         :align="item.align || 'center'" :fixed="item.fixed || false" :show-overflow-tooltip="item.overflow || true">
          <template slot-scope="scope">
            <!--通过插槽去实现自定义列-->
            <slot v-if="item.slot" :name="scope.column.property" :row="scope.row" :$index="scope.$index"/>
            <span v-else>{{scope.row[scope.column.property]}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column v-if="action" :label="$st('m2.table.action')" align="center" :width="actionWidth" :fixed="isFixedAction?'right':false">
        <template slot-scope="scope">
          <div class="action-cell">
            <slot name="action" :row="scope.row" :$index="scope.$index"/>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer" v-if="showFooter">
      <div class="footer">
        <slot name="footer"></slot>
      </div>
      <m2-pager :pager="pager" v-if="pager"/>
    </div>
  </div>
</template>

<script>
  import { locale } from 'mixins'
  import M2Pager from './pager'

  export default {
    name: 'm2-table',
    mixins: [locale],
    components: {
      M2Pager
    },
    props: {
      showHeader: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      caption: {
        type: String,
        default: ''
      },
      checkbox: {
        type: Boolean,
        default: false
      },
      radio: {
        type: Boolean,
        default: false
      },
      index: {
        type: Boolean,
        default: true
      },
      action: {
        type: Boolean,
        default: true
      },
      actionWidth: {
        type: Number,
        default: 150
      },
      pager: {
        type: Object,
        default() {
          return {}
        }
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      rowClassName: {
        type: [Function, String]
      },
      isFixedAction: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        item: null
      }
    },
    methods: {
      handleSelectedChange(val) {
        this.$emit('selected', val)
      },
      handleSelectedItemChange(val) {
        this.item = val
        this.$emit('selectedItem', val)
      }
    }
  }
</script>
