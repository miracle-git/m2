/**
 * @file DataVerifyCode
 * @description 图形验证码
 */
import { DEFAULT_VERIFY_CODE_OPTIONS, VERIFY_CODE_TYPE } from '../constants'
import { DataUtil } from './data-util'

const _verify_code_core = {
  init(inst) {
    const { container, options } = inst
    if (!container) {
      console.warn('当前验证码容器containerId未正确配置，无法正常获取！')
      return
    }

    const $canvas = document.createElement('canvas')
    options.width = container.offsetWidth > 0 ? container.offsetWidth : '100'
    options.height = container.offsetHeight > 0 ? container.offsetHeight : '30'
    $canvas.id = options.canvasId
    $canvas.width = options.width
    $canvas.height = options.height
    $canvas.style.cursor = 'pointer'
    $canvas.innerHTML = '您的浏览器版本不支持canvas'

    container.appendChild($canvas)
    $canvas.onclick = () => {
      _verify_code_core.refresh(inst)
    }
  },
  getTextChoices(options) {
    const { type, numbers, letters } = options
    switch (type) {
      case VERIFY_CODE_TYPE.letter:
        return letters
      case VERIFY_CODE_TYPE.number:
        return numbers
      case VERIFY_CODE_TYPE.letterNumber:
      default:
        return letters.concat(numbers)
    }
  },
  refresh(inst) {
    const { options } = inst

    options.code = ''
    const $canvas = document.getElementById(options.canvasId)
    if (!$canvas.getContext) return

    const $context = $canvas.getContext('2d')
    $context.textBaseline = 'middle'
    $context.fillStyle = DataUtil.randomColor(180, 240)
    $context.fillRect(0, 0, options.width, options.height)

    const choices = _verify_code_core.getTextChoices(options)
    for (let i = 1; i <= options.len; i++) {
      const textCode = choices[DataUtil.randomNumber(0, choices.length)]
      options.code += textCode
      $context.font = DataUtil.randomNumber(options.height / 2, options.height) + 'px SimHei' // 随机生成字体大小
      $context.fillStyle = DataUtil.randomColor(50, 160) // 随机生成字体颜色
      $context.shadowOffsetX = DataUtil.randomNumber(-3, 3)
      $context.shadowOffsetY = DataUtil.randomNumber(-3, 3)
      $context.shadowBlur = DataUtil.randomNumber(-3, 3)
      $context.shadowColor = 'rgba(0, 0, 0, 0.3)'

      const x = options.width / 5 * i
      const y = options.height / 2
      const deg = DataUtil.randomNumber(-30, 30)
      // 设置旋转角度和坐标原点
      $context.translate(x, y)
      $context.rotate(deg * Math.PI / 180)
      $context.fillText(textCode, 0, 0)
      // 恢复旋转角度和坐标原点
      $context.rotate(-deg * Math.PI / 180)
      $context.translate(-x, -y)
    }

    // 绘制干扰线
    if (options.strokeLine) {
      for (let i = 0; i < options.len; i++) {
        $context.strokeStyle = DataUtil.randomColor(40, 180)
        $context.beginPath()
        $context.moveTo(DataUtil.randomNumber(0, options.width), DataUtil.randomNumber(0, options.height))
        $context.lineTo(DataUtil.randomNumber(0, options.width), DataUtil.randomNumber(0, options.height))
        $context.stroke()
      }
    }
    // 绘制干扰点
    if (options.strokePoint) {
      for (let i = 0; i < options.width / 4; i++) {
        $context.fillStyle = DataUtil.randomColor(0, 255)
        $context.beginPath()
        $context.arc(DataUtil.randomNumber(0, options.width), DataUtil.randomNumber(0, options.height), 1, 0, 2 * Math.PI)
        $context.fill()
      }
    }
  }
}

export class DataVerifyCode {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId || 'tx-verify-code')
    this.options = {
      ...DEFAULT_VERIFY_CODE_OPTIONS,
      ...options,
      numbers: DataUtil.getAllNumbers(),
      letters: DataUtil.getAllLetters()
    }

    _verify_code_core.init(this)
    _verify_code_core.refresh(this)
  }
  /**
   * @constant 比对图形验证码进行验证
   * @param {String} val 比对值
   * @returns {Boolean} 返回是否比对成功
   */
  validate(val) {
    const { code, ignoreCase, autoRefresh } = this.options
    let [_code, _vcode] = [code, val]
    if (ignoreCase) {
      _code = code.toLowerCase()
      _vcode = val.toLowerCase()
    }
    const result = _code === _vcode
    // 如果未比对成功自动刷新
    if (!result && autoRefresh) {
      _verify_code_core.refresh(this)
    }
    return result
  }
}
