/**
 * @file DataBus
 * @description 基于events封装的事件发射类
 */
import EventEmitter from 'events'

const _event_core = {
  _emitter: new EventEmitter()
}

export class DataBus {
  static on(type, handler) {
    _event_core._emitter.on(type, handler)
  }

  static emit(type, data) {
    _event_core._emitter.emit(type, data)
  }

  static off(type, handler = () => {}) {
    _event_core._emitter.off(type, handler)
  }
}
