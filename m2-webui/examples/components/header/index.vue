<template>
  <div class="header-wrapper">
    <header class="header" ref="header">
      <div class="container">
        <el-badge value="1.0.1" :max="10" class="version">
          <h1>
            <router-link :to="`/${ lang }`">
            <!-- logo -->
            <slot>
              M2 WebUI
            </slot>
            </router-link>
          </h1>
        </el-badge>
        <!-- nav -->
        <ul class="nav">
          <!-- gap -->
          <!-- <li class="nav-item" v-show="isComponentPage">
            <div class="nav-gap"></div>
          </li> -->
          <!-- 语言选择器 -->
<!--          <li class="nav-item lang-item">-->
<!--            <el-dropdown-->
<!--              trigger="click"-->
<!--              class="nav-dropdown nav-lang"-->
<!--              :class="{ 'is-active': langDropdownVisible }">-->
<!--              <span>-->
<!--                {{ displayedLang }}-->
<!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--              </span>-->
<!--              <el-dropdown-menu-->
<!--                slot="dropdown"-->
<!--                class="nav-dropdown-list"-->
<!--                @input="handleLangDropdownToggle">-->
<!--                <el-dropdown-item-->
<!--                  v-for="(value, key) in langs"-->
<!--                  :key="key"-->
<!--                  @click.native="switchLang(key)">-->
<!--                  {{ value }}-->
<!--                </el-dropdown-item>-->
<!--              </el-dropdown-menu>-->
<!--            </el-dropdown>-->
<!--          </li>-->
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
  import main from 'main'
  import langs from 'examples/i18n/component.json'

  export default {
    data() {
      return {
        active: '',
        verDropdownVisible: true,
        langDropdownVisible: true,
        langs: {
          'zh-CN': '中文',
          'en-US': 'English'
        },
        version: main.version
      }
    },
    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN'
      },
      displayedLang() {
        return this.langs[this.lang] || '中文'
      },
      langConfig() {
        return langs.filter(config => config.lang === this.lang)[0].header
      },
      isComponentPage() {
        return /^component/.test(this.$route.name)
      }
    },
    mounted() {
    },
    methods: {
      switchLang(targetLang) {
        if (this.lang === targetLang) return
        localStorage.setItem('M2_LANGUAGE', targetLang)
        this.$router.push(this.$route.path.replace(this.lang, targetLang))
      },
      handleLangDropdownToggle(visible) {
        this.langDropdownVisible = visible
      }
    }
  }
</script>

<style lang="less">
  @import "./index.less";
</style>
