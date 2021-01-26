import { DataType } from 'm2-core'

export default {
  props: {
    layout: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    empty() {
      return DataType.isEmptyArray(this.layout)
    }
  },
  methods: {
    has(key, layout = 'layout') {
      return this[layout] && this[layout].some(item => item === key)
    }
  }
}
