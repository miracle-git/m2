<template>
  <m2-modal ref="modal" m-class="m2-prompt" :title="title || $st('m2.confirm.title')" width="400px"
             @ok="handleConfirm" @cancel="handleCancel" @close="handleCancel(true)">
    <p slot="body" class="content">{{message || $st('m2.confirm.message')}}</p>
  </m2-modal>
</template>

<script>
  import { DataType } from 'm2-core'
  import { modal, locale } from 'mixins'
  import M2Modal from 'packages/modal'

  export default {
    name: 'm2-prompt',
    mixins: [modal, locale],
    components: {
      M2Modal
    },
    data() {
      return {
        title: '',
        message: '',
        confirm: null,
        cancel: null
      }
    },
    methods: {
      handleConfirm() {
        DataType.isFunction(this.confirm) && this.confirm()
      },
      handleCancel(close = false) {
        const handler = close ? (this.close || this.cancel) : this.cancel
        DataType.isFunction(handler) && handler()
        this.hide()
        document.body.removeChild(this.$refs.modal.$el)
      }
    }
  }
</script>
