<template>
  <div :class="['m2-header', `m2-header-${this.scope}`]">
    <div class="header-inner" v-if="empty">
      <slot/>
    </div>
    <div class="header-inner" v-else>
      <div class="header-left">
        <div class="logo" v-if="has('logo')">
          <slot name="logo" >
            <m2-link to="/" :m-class="`logo-icon logo-${this.scope}`">
              <span class="logo-text">M2 WebApp</span>
            </m2-link>
          </slot>
        </div>
      </div>
      <div class="header-center">
        <div class="menu-list">
          <slot name="menus" v-if="has('menus')">
            <m2-navbar :menus="menus" v-if="showMenuList"/>
          </slot>
        </div>
      </div>
      <div class="header-right">
        <div class="header-right-inner">
          <m2-search v-if="has('search')"/>
          <m2-feedback v-if="has('feedback')"/>
          <slot name="links" v-if="has('links')">
            <m2-link :text="$st('m2.layout.links.exit')"/>
          </slot>
          <slot name="icons" v-if="has('icons')">
            <m2-icons/>
          </slot>
          <slot name="avatar" v-if="has('avatar')">
            <m2-avatar :avatar="avatar"/>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { layout, locale } from 'mixins'
  import M2Link from 'packages/link'
  import M2Navbar from './navbar'
  import M2Search from './search'
  import M2Feedback from './feedback'
  import M2Icons from './icons'
  import M2Avatar from './avatar'

  export default {
    name: 'm2-header',
    mixins: [layout, locale],
    components: {
      M2Link,
      M2Navbar,
      M2Search,
      M2Feedback,
      M2Icons,
      M2Avatar
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
      },
      avatar: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showMenuList() {
        return this.menus.data && this.menus.data.length > 0
      }
    }
  }
</script>
