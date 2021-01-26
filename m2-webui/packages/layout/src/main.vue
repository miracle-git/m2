<template>
  <m2-container m-class="m2-layout">
    <m2-header :scope="scope" :layout="layoutConfig" :menus="navbarMenus" :avatar="avatarMenus">
      <slot name="header-logo" slot="logo" v-if="has('logo', 'layoutConfig')"/>
      <slot name="header-menus" slot="menus" v-if="has('menus', 'layoutConfig')"/>
      <slot name="header-links" slot="links" v-if="has('links', 'layoutConfig')"/>
      <slot name="header-icons" slot="icons" v-if="has('icons', 'layoutConfig')"/>
      <slot name="header-avatar" slot="avatar" v-if="has('avatar', 'layoutConfig')"/>
      <slot v-if="empty"/>
    </m2-header>
    <m2-content :scope="scope" :layout="contentLayout" :menus="sidebarMenus" @toggleCollapse="handleToggleCollapse">
      <slot name="content-sidebar" slot="sidebar"/>
      <slot name="content-main" slot="main"/>
    </m2-content>
  </m2-container>
</template>

<script>
  import { oneOf } from 'm2-webui/src/utils/main'
  import { layout } from 'mixins'
  import M2Container from 'packages/container'
  import M2Header from './header'
  import M2Content from './content'

  export default {
    name: 'm2-layout',
    mixins: [layout],
    components: {
      M2Container,
      M2Header,
      M2Content
    },
    provide() {
      return {
        sidebarCollapse: this.sidebarCollapse
      }
    },
    props: {
      scope: {
        type: String,
        default: 'oa',
        validator(val) {
          return val && oneOf(val, ['oa', 'oc'], 'scope')
        }
      },
      headerLayout: {
        type: Array,
        default: () => []
      },
      contentLayout: {
        type: Array,
        default: () => ['sidebar']
      },
      navbarMenus: {
        type: Object,
        default: () => ({ active: '', map: {}, data: [] })
      },
      avatarMenus: {
        type: Object,
        default: () => ({ url: '', avatarUrl: '', defaultUrl: '', map: {}, data: [] })
      },
      sidebarMenus: {
        type: Object,
        default: () => ({ active: '', homeLink: '', homeText: '', map: {}, data: [] })
      },
      sidebarCollapse: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      layoutConfig() {
        if (this.headerLayout && this.headerLayout.length > 0) {
          return this.headerLayout
        }
        let defaultLayout = []
        if (this.scope === 'oa') {
          defaultLayout = ['logo', 'menus', 'search', 'feedback', 'links']
        } else if (this.scope === 'oc') {
          defaultLayout = ['logo', 'menus', 'icons', 'avatar']
        }
        return defaultLayout
      }
    },
    created() {
      this.$bus.$on('search', keyword => this.$emit('search', keyword))
      this.$bus.$on('avatar', type => this.$emit('avatar', type))
    },
    methods: {
      handleToggleCollapse(collapse) {
        // 继续向上传递
        this.$emit('toggleCollapse', collapse)
      }
    }
  }
</script>
