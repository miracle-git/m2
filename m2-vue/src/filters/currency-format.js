import { DataUtil } from 'm2-core'

export default [{
  name: 'currency',
  rule: (val, { precision = 0, symbol = '￥', format = true } = {}) => {
    if (format) {
      return symbol + DataUtil.formatMoney(val, precision)
    } else {
      const money = parseFloat(val)
      return isNaN(money) ? '' : symbol + money.toFixed(precision)
    }
  }
}]
