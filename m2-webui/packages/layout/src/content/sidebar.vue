<template>
  <div class="m2-sidebar" :class="{'sidebar-collapse':collapse}">
    <div class="sidebar-wrapper">
      <el-menu :default-active="current" :collapse="collapse"
               :collapse-transition="false" :style="contentStyle">
        <m2-sidebar-menu :data="menuList" :collapse="collapse"/>
      </el-menu>
      <div class="toggle-sidebar" :class="{'toggle-collapse':collapse}" ref="toggle-sidebar">
        <i class="toggle-icon" :class="toggleClass" @click="toggleCollapse"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { locale, calc, sidebar } from 'mixins'
  import M2SidebarMenu from './menu'

  export default {
    name: 'm2-sidebar',
    mixins: [locale, calc, sidebar],
    components: {
      M2SidebarMenu
    },
    inject: ['sidebarCollapse'],
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
      },
      current: [Number, String]
    },
    data() {
      return {
        collapse: false
      }
    },
    computed: {
      toggleClass() {
        return this.collapse ? 'unfold' : 'fold'
      }
    },
    mounted() {
      this.sidebarCollapse && this.toggleCollapse()
    },
    methods: {
      calculateHeight(clientHeight) {
         return clientHeight - 60 - this.$refs['toggle-sidebar'].offsetHeight
      },
      toggleCollapse() {
        this.collapse = !this.collapse
        this.$emit('toggle', this.collapse)
      }
    }
  }
</script>
