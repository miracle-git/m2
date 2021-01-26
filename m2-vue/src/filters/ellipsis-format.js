export default [{
  name: 'ellipsis',
  rule: (val, { minLength = 20, before = 10, after = 6 } = {}) => {
    if (!val) return ''
    const len = val.length
    if (len > minLength) {
      return val.substring(0, before) + '...' + val.substring(len - after, len)
    }
    return val
  }
}]
