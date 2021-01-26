<template>
  <div
    class="side-nav"
    @mouseenter="isFade = false"
    :class="{ 'is-fade': isFade }"
    :style="navStyle">
    <ul>
      <li
        class="nav-item"
        v-for="(item, key) in data"
        :key="key">
        <a v-if="!item.path && !item.href" @click="expandMenu">{{item.name}}</a>
        <a v-if="item.href" :href="item.href" target="_blank">{{item.name}}</a>
        <router-link
          v-if="item.path"
          active-class="active"
          :to="base + item.path"
          exact
          v-text="item.title || item.name">
        </router-link>
        <ul class="pure-menu-list sub-nav" v-if="item.children">
          <li
            class="nav-item"
            v-for="(navItem, key) in item.children"
            :key="key">
            <router-link
              class=""
              active-class="active"
              :to="base + navItem.path"
              exact
              v-text="navItem.title || navItem.name">
            </router-link>
          </li>
        </ul>
        <template v-if="item.groups">
          <div
            class="nav-group"
            v-for="(group, key) in item.groups"
            :key="key"
          >
            <div class="nav-group__title" @click="expandMenu">{{group.groupName}}</div>
            <ul class="pure-menu-list">
              <li
                class="nav-item"
                v-for="(navItem, key) in group.list"
                v-show="!navItem.disabled"
                :key="key">
                <router-link
                  active-class="active"
                  :to="base + navItem.path"
                  exact
                  v-text="navItem.title"></router-link>
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
  import bus from 'examples/utils/bus'
  import langs from 'examples/i18n/component.json'

  export default {
    props: {
      data: Array,
      base: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        highlights: [],
        navState: [],
        isSmallScreen: false,
        isFade: false
      }
    },
    watch: {
      '$route.path'() {
        this.handlePathChange()
      },
      isFade(val) {
        bus.$emit('navFade', val)
      }
    },
    computed: {
      navStyle() {
        const style = {}
        if (this.isSmallScreen) {
          style.paddingBottom = '60px'
        }
        style.opacity = this.isFade ? '0.5' : '1'
        return style
      },
      lang() {
        return this.$route.meta.lang
      },
      langConfig() {
        return langs.filter(config => config.lang === this.lang)[0].nav
      }
    },
    methods: {
      handleResize() {
        this.isSmallScreen = document.documentElement.clientWidth < 768
        this.handlePathChange()
      },
      handlePathChange() {
        if (!this.isSmallScreen) {
          this.expandAllMenu()
          return
        }
        this.$nextTick(() => {
          this.hideAllMenu()
          const activeAnchor = this.$el.querySelector('a.active')
          let ul = activeAnchor.parentNode
          while (ul.tagName !== 'UL') {
            ul = ul.parentNode
          }
          ul.style.height = 'auto'
        })
      },
      hideAllMenu() {
        [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
          ul.style.height = '0'
        })
      },
      expandAllMenu() {
        [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
          ul.style.height = 'auto'
        })
      },
      expandMenu(event) {
        if (!this.isSmallScreen) return
        const target = event.currentTarget
        if (!target.nextElementSibling || target.nextElementSibling.tagName !== 'UL') return
        this.hideAllMenu()
        event.currentTarget.nextElementSibling.style.height = 'auto'
      }
    },
    created() {
      bus.$on('fadeNav', () => {
        this.isFade = true
      })
    },
    mounted() {
      this.handleResize()
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>

<style lang="less">
  @import "./index.less";
</style>
