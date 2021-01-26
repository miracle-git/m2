"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = [{
  name: 'ellipsis',
  rule: function rule(val) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$minLength = _ref.minLength,
        minLength = _ref$minLength === void 0 ? 20 : _ref$minLength,
        _ref$before = _ref.before,
        before = _ref$before === void 0 ? 10 : _ref$before,
        _ref$after = _ref.after,
        after = _ref$after === void 0 ? 6 : _ref$after;

    if (!val) return '';
    var len = val.length;

    if (len > minLength) {
      return val.substring(0, before) + '...' + val.substring(len - after, len);
    }

    return val;
  }
}];
exports["default"] = _default;