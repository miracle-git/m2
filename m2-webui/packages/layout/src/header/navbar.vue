<template>
  <ul class="m2-navbar">
    <li v-for="(item, index) in menuList.current" :key="index">
      <m2-tooltip :content="item.text" effect="light" placement="bottom">
        <div m-tooltip class="ellipsis" style="width: 150px;">
          <m2-link v-if="item.url" :m-class="getMenuClass(item)" :to="item.url" :target="item.target" :text="item.text"/>
          <div v-else :class="getMenuClass(item)" @click="handleLinkClick(item)">
            {{item.text}}
          </div>
        </div>
      </m2-tooltip>
    </li>
    <li v-if="showMoreMenu">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{$st('m2.layout.navbar.more')}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="m2-drop-menu app-drop-menu">
          <el-dropdown-item v-for="(item, index) in menuList.more" :key="index">
            <m2-link v-if="item.url" :m-class="getMenuClass(item)" :to="item.url" :target="item.target" :text="item.text"/>
            <div v-else :class="getMenuClass(item)" @click="handleLinkClick(item)">
              {{item.text}}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </ul>
</template>

<script>
  import { locale, link } from 'mixins'
  import M2Link from 'packages/link'
  import M2Tooltip from 'packages/tooltip'

  export default {
    name: 'm2-navbar',
    mixins: [locale, link],
    components: {
      M2Link,
      M2Tooltip
    },
    props: {
      menus: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        showMaxMenuCount: 5
      }
    },
    computed: {
      menuList() {
        const res = { current: [], more: [] }
        const { map = {}, data = [] } = this.menus
        const mapMenus = data.map(item => ({
          key: item[map.key] || item.key,
          url: item[map.url] || item.url,
          text: item[map.text] || item.text,
          click: item[map.click] || item.click,
          target: item[map.target] || item.target
        }))
        if (mapMenus.length <= this.showMaxMenuCount) {
          res.current = mapMenus
        } else {
          res.current = mapMenus.slice(0, this.showMaxMenuCount)
          res.more = mapMenus.slice(this.showMaxMenuCount)
        }
        return res
      },
      showMoreMenu() {
        return this.menus.data.length > this.showMaxMenuCount
      }
    },
    methods: {
      isActiveMenu(item) {
        return this.menus.active !== undefined && item.key === this.menus.active
      },
      getMenuClass(item) {
        let res = 'nav-item ellipsis'
        if (this.isActiveMenu(item)) {
          res += ' selected'
        }
        return res
      }
    }
  }
</script>
