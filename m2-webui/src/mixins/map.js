export default {
  methods: {
    getSelectedItems(items = []) {
      return items.map(item => {
        const { key, text, tags, modal } = this.getCurrentItem(item)
        return {
          ...item,
          _key: `${key}-${text}`,
          _text: text,
          _tags: tags,
          _modal: modal
        }
      })
    }
  }
}
