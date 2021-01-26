<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header v-if="lang !== 'play'"></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import locale from 'main/locale'
  import zhLocale from 'main/locale/lang/zh-CN'
  import enLocale from 'main/locale/lang/en-US'

  const lang = location.hash.replace('#', '').split('/')[1] || 'zh-CN'
  const localize = lang => {
    switch (lang) {
      case 'en-US':
        locale.use(enLocale)
        break
      case 'zh-CN':
        default:
        locale.use(zhLocale)
        break
    }
  }
  localize(lang)

  export default {
    name: 'app',
    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN'
      },
      isComponent() {
        return /^component-/.test(this.$route.name || '')
      }
    },
    watch: {
      lang(val) {
        localize(val)
      }
    },
    mounted() {
      localize(this.lang)
    }
  }
</script>
