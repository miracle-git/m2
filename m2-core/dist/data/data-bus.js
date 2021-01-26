"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataBus = void 0;

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _event_core = {
  _emitter: new _events["default"]()
};

var DataBus = /*#__PURE__*/function () {
  function DataBus() {
    _classCallCheck(this, DataBus);
  }

  _createClass(DataBus, null, [{
    key: "on",
    value: function on(type, handler) {
      _event_core._emitter.on(type, handler);
    }
  }, {
    key: "emit",
    value: function emit(type, data) {
      _event_core._emitter.emit(type, data);
    }
  }, {
    key: "off",
    value: function off(type) {
      var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      _event_core._emitter.off(type, handler);
    }
  }]);

  return DataBus;
}();

exports.DataBus = DataBus;