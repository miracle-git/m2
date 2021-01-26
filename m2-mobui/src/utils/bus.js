import { DataBus } from 'm2-core'

export default class EventBus {
  $on(name, fn) {
    DataBus.on(name, fn)
  }

  $emit(name, args) {
    DataBus.emit(name, args)
  }

  $off(name, fn) {
    DataBus.off(name, fn)
  }
}
