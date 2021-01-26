export default {
  methods: {
    dispatch(name, data) {
      let parent = this.$parent
      while(parent) {
        parent.$emit(name, data)
        parent = parent.$parent
      }
    },
    broadcast(name, data) {
      this.$children.forEach(item => {
        item.$emit(name, data)
        if (item.$children && item.$children.length) {
          this.broadcast.call(item, name, data)
        }
      })
    }
  }
}
