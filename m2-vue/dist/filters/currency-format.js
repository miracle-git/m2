"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _m2Core = require("m2-core");

var _default = [{
  name: 'currency',
  rule: function rule(val) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$precision = _ref.precision,
        precision = _ref$precision === void 0 ? 0 : _ref$precision,
        _ref$symbol = _ref.symbol,
        symbol = _ref$symbol === void 0 ? '￥' : _ref$symbol,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? true : _ref$format;

    if (format) {
      return symbol + _m2Core.DataUtil.formatMoney(val, precision);
    } else {
      var money = parseFloat(val);
      return isNaN(money) ? '' : symbol + money.toFixed(precision);
    }
  }
}];
exports["default"] = _default;