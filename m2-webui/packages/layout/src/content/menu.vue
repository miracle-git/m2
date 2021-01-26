<template>
  <fragment>
    <component
      v-for="(item, index) in data" :key="index"
      :is="hasChildren(item) ? 'el-submenu' : 'el-menu-item'"
      :index="item.key" :class="item.className"
      popper-class="m2-sidebar-menu-popper">
      <template :slot="hasChildren(item)?'title':'default'">
        <el-tooltip
          :disabled="!collapse || hasChildren(item)"
          :content="item.text"
          popper-class="m2-sidebar-menu-tooltip-popper"
          placement="right"
          effect="light">
          <div class="menu-item" @click="handleLinkClick(item)">
            <i v-if="item.icon" class="menu-icon" :class="item.icon"></i>
            <span slot="title">{{item.text}}<sup class="badge" v-if="item.badge">{{getBadgeValue(item)}}</sup></span>
          </div>
        </el-tooltip>
      </template>
      <m2-sidebar-menu :data="item.children" v-if="hasChildren(item)"/>
    </component>
  </fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import { DataType } from 'm2-core'
  import { link } from 'mixins'

  export default {
    name: 'm2-sidebar-menu',
    mixins: [link],
    components: {
      Fragment
    },
    props: {
      data: {
        type: Array,
        default: () => []
      },
      collapse: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hasChildren(item) {
        return !DataType.isEmptyArray(item.children)
      },
      getBadgeValue(item) {
        const badge = item.badge || ''
        const badgeMax = item.badgeMax || ''
        if (typeof badge === 'number' && typeof badgeMax === 'number' && badgeMax > 0) {
          return badge > badgeMax ? badgeMax + '+' : badge
        }
        return badge
      }
    }
  }
</script>
