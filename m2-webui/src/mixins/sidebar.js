import { getMapItem } from '../utils/main'

export default {
  data() {
    return {
      menuList: [],
      collapseClass: '',
      activeIndex: ''
    }
  },
  watch: {
    menus: {
      handler(val) {
        this.handleMenus()
      },
      deep: true
    }
  },
  mounted() {
    this.handleMenus()
  },
  methods: {
    handleMenus() {
      const { active, map = {}, data = [] } = this.menus
      this.activeIndex = active
      this.menuList = this.getMenuList(map, data, 1)
    },
    getMenuList(map, data, level) {
      return data.map(item => {
        const menuItem = getMapItem(item, map, 'key', 'text', 'icon', 'url', 'target', 'click', 'badge', 'badgeMax')
        const children = item[map.children] || item.children
        menuItem.level = level
        if (level === 1) {
          // 第一级目录
          menuItem.icon = menuItem.icon || 'el-icon-menu'
          menuItem.title = item.alias || menuItem.text
        }
        if (menuItem.level) {
          menuItem.className = `m2-menu-item-${menuItem.level}`
        }
        if (!!children && children.length > 0) {
          menuItem.slotName = 'title'
          menuItem.children = this.getMenuList(map, children, level + 1)
        } else {
          menuItem.slotName = 'default'
        }
        return menuItem
      })
    },
    handleToggleMenu(collapse) {
      this.collapseClass = collapse ? 'nav-collapse' : ''
      this.$emit('toggleCollapse', collapse)
    }
  }
}
