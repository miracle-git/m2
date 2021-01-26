export default {
  methods: {
    show() {
      this.$refs.modal && this.$refs.modal.show()
    },
    hide() {
      this.$refs.modal && this.$refs.modal.hide()
    }
  }
}
