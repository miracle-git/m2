<template>
  <div class="m2-content" :class="mClass">
    <div class="page-nav" v-if="has('sidebar')" :class="collapseClass">
      <slot name="sidebar">
        <m2-sidebar :scope="scope" :current="activeIndex" :menus="menus" @toggle="handleToggleMenu"/>
      </slot>
    </div>
    <div class="page-content">
      <slot name="main">
        <m2-router-view :nested="true"/>
      </slot>
    </div>
    <el-backtop class="m2-back-top" target=".page-content .page-container" :bottom="100">
      <el-tooltip :content="$st('m2.layout.backtop')" placement="top" effect="light" popper-class="m2-backtop-popper">
        <i class="el-icon-top"></i>
      </el-tooltip>
    </el-backtop>
  </div>
</template>

<script>
  import { classes, layout, locale, sidebar } from 'mixins'
  import M2RouterView from 'packages/router-view'
  import M2Sidebar from './sidebar'

  export default {
    name: 'm2-content',
    mixins: [classes, layout, locale, sidebar],
    components: {
      M2RouterView,
      M2Sidebar
    },
    props: {
      scope: {
        type: String,
        required: true
      },
      menus: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>
