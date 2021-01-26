import locale from '../locale'

export default {
  methods: {
    $st(...args) {
      return locale.t.apply(this, args)
    }
  }
}
