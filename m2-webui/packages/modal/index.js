import Modal from './src/main'

Modal.install = (Vue) => {
  Vue.component(Modal.name, Modal)
}

export default Modal
