import { DataType } from 'm2-core'
import { isRouteLink } from '../utils/main'

export default {
  methods: {
    handleLinkClick(item) {
      if (item.url) {
        if (isRouteLink(item.url) && this.$router) {
          try {
            const link = this.$router.push({ path: item.url })
            if (link && link.catch) {
              link.catch(() => {})
            }
          } catch (e) {}
        } else {
          window.open(item.url, item.target || '_blank')
        }
      } else if (DataType.isFunction(item.click)) {
        item.click(item)
      }
    }
  }
}
