"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataVerifyCode = void 0;

var _constants = require("../constants");

var _dataUtil = require("./data-util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _verify_code_core = {
  init: function init(inst) {
    var container = inst.container,
        options = inst.options;

    if (!container) {
      console.warn('当前验证码容器containerId未正确配置，无法正常获取！');
      return;
    }

    var $canvas = document.createElement('canvas');
    options.width = container.offsetWidth > 0 ? container.offsetWidth : '100';
    options.height = container.offsetHeight > 0 ? container.offsetHeight : '30';
    $canvas.id = options.canvasId;
    $canvas.width = options.width;
    $canvas.height = options.height;
    $canvas.style.cursor = 'pointer';
    $canvas.innerHTML = '您的浏览器版本不支持canvas';
    container.appendChild($canvas);

    $canvas.onclick = function () {
      _verify_code_core.refresh(inst);
    };
  },
  getTextChoices: function getTextChoices(options) {
    var type = options.type,
        numbers = options.numbers,
        letters = options.letters;

    switch (type) {
      case _constants.VERIFY_CODE_TYPE.letter:
        return letters;

      case _constants.VERIFY_CODE_TYPE.number:
        return numbers;

      case _constants.VERIFY_CODE_TYPE.letterNumber:
      default:
        return letters.concat(numbers);
    }
  },
  refresh: function refresh(inst) {
    var options = inst.options;
    options.code = '';
    var $canvas = document.getElementById(options.canvasId);
    if (!$canvas.getContext) return;
    var $context = $canvas.getContext('2d');
    $context.textBaseline = 'middle';
    $context.fillStyle = _dataUtil.DataUtil.randomColor(180, 240);
    $context.fillRect(0, 0, options.width, options.height);

    var choices = _verify_code_core.getTextChoices(options);

    for (var i = 1; i <= options.len; i++) {
      var textCode = choices[_dataUtil.DataUtil.randomNumber(0, choices.length)];

      options.code += textCode;
      $context.font = _dataUtil.DataUtil.randomNumber(options.height / 2, options.height) + 'px SimHei'; // 随机生成字体大小

      $context.fillStyle = _dataUtil.DataUtil.randomColor(50, 160); // 随机生成字体颜色

      $context.shadowOffsetX = _dataUtil.DataUtil.randomNumber(-3, 3);
      $context.shadowOffsetY = _dataUtil.DataUtil.randomNumber(-3, 3);
      $context.shadowBlur = _dataUtil.DataUtil.randomNumber(-3, 3);
      $context.shadowColor = 'rgba(0, 0, 0, 0.3)';
      var x = options.width / 5 * i;
      var y = options.height / 2;

      var deg = _dataUtil.DataUtil.randomNumber(-30, 30); // 设置旋转角度和坐标原点


      $context.translate(x, y);
      $context.rotate(deg * Math.PI / 180);
      $context.fillText(textCode, 0, 0); // 恢复旋转角度和坐标原点

      $context.rotate(-deg * Math.PI / 180);
      $context.translate(-x, -y);
    } // 绘制干扰线


    if (options.strokeLine) {
      for (var _i = 0; _i < options.len; _i++) {
        $context.strokeStyle = _dataUtil.DataUtil.randomColor(40, 180);
        $context.beginPath();
        $context.moveTo(_dataUtil.DataUtil.randomNumber(0, options.width), _dataUtil.DataUtil.randomNumber(0, options.height));
        $context.lineTo(_dataUtil.DataUtil.randomNumber(0, options.width), _dataUtil.DataUtil.randomNumber(0, options.height));
        $context.stroke();
      }
    } // 绘制干扰点


    if (options.strokePoint) {
      for (var _i2 = 0; _i2 < options.width / 4; _i2++) {
        $context.fillStyle = _dataUtil.DataUtil.randomColor(0, 255);
        $context.beginPath();
        $context.arc(_dataUtil.DataUtil.randomNumber(0, options.width), _dataUtil.DataUtil.randomNumber(0, options.height), 1, 0, 2 * Math.PI);
        $context.fill();
      }
    }
  }
};

var DataVerifyCode = /*#__PURE__*/function () {
  function DataVerifyCode(containerId) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DataVerifyCode);

    this.container = document.getElementById(containerId || 'tx-verify-code');
    this.options = _objectSpread(_objectSpread(_objectSpread({}, _constants.DEFAULT_VERIFY_CODE_OPTIONS), options), {}, {
      numbers: _dataUtil.DataUtil.getAllNumbers(),
      letters: _dataUtil.DataUtil.getAllLetters()
    });

    _verify_code_core.init(this);

    _verify_code_core.refresh(this);
  }
  /**
   * @constant 比对图形验证码进行验证
   * @param {String} val 比对值
   * @returns {Boolean} 返回是否比对成功
   */


  _createClass(DataVerifyCode, [{
    key: "validate",
    value: function validate(val) {
      var _this$options = this.options,
          code = _this$options.code,
          ignoreCase = _this$options.ignoreCase,
          autoRefresh = _this$options.autoRefresh;
      var _code = code,
          _vcode = val;

      if (ignoreCase) {
        _code = code.toLowerCase();
        _vcode = val.toLowerCase();
      }

      var result = _code === _vcode; // 如果未比对成功自动刷新

      if (!result && autoRefresh) {
        _verify_code_core.refresh(this);
      }

      return result;
    }
  }]);

  return DataVerifyCode;
}();

exports.DataVerifyCode = DataVerifyCode;