<template>
  <div class="m2-avatar" :class="mClass">
    <el-dropdown @command="handleCommand">
      <div class="m2-avatar-inner">
        <m2-link :to="avatar.url">
          <span class="avatar-item">
            <el-avatar size="small" :src="avatar.avatarUrl">
              <img v-if="defaultUrl" :src="defaultUrl" alt=""/>
            </el-avatar>
          </span>
        </m2-link>
      </div>
      <el-dropdown-menu slot="dropdown" class="m2-avatar-dropdown" v-if="menus.length">
        <m2-link :to="item.url" :target="item.target" v-for="(item, index) in menus" :key="index">
          <el-dropdown-item :icon="item.icon" :command="getCommandType(item)" :divided="item.divided" :disabled="item.disabled">
            {{item.text}}
          </el-dropdown-item>
        </m2-link>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import { classes } from 'mixins'
  import M2Link from 'packages/link'

  export default {
    name: 'm2-avatar',
    mixins: [classes],
    components: {
      M2Link
    },
    props: {
      avatar: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      defaultUrl() {
        return this.avatar.defaultUrl || require('packages/theme-grace/img/avatar.gif')
      },
      menus() {
        const { map = {}, data = [] } = this.avatar
        return data.map(item => ({
          text: item[map.text] || item.text,
          target: item[map.target] || item.target,
          url: this.getLinkUrl(item, map),
          type: item[map.type] || item.type,
          divided: item[map.divided] || item.divided || false,
          disabled: item[map.disabled] || item.disabled || false
        }))
      }
    },
    methods: {
      handleCommand(item) {
        item && this.$bus.$emit('avatar', item)
      },
      getLinkUrl(item, map) {
        if (item.disabled) return 'javascript:void(0)'
        return item[map.url] || item.url || 'javascript:void(0)'
      },
      getCommandType(item) {
        if (item.disabled || item.url !== 'javascript:void(0)') return ''
        return item.type || ''
      }
    }
  }
</script>
