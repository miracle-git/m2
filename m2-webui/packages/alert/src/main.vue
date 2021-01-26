<template>
  <m2-modal ref="modal" m-class="m2-alert" :title="title || $st('m2.alert.title')"
             :size="size" :show-footer="false" @cancel="handleClose" @close="handleClose">
    <p slot="body" class="content">{{message || $st('m2.alert.message')}}</p>
  </m2-modal>
</template>

<script>
  import { DataType } from 'm2-core'
  import { modal, locale } from 'mixins'
  import M2Modal from 'packages/modal'

  export default {
    name: 'm2-alert',
    mixins: [modal, locale],
    components: {
      M2Modal
    },
    data() {
      return {
        title: '',
        message: '',
        size: '',
        close: null
      }
    },
    methods: {
      handleClose() {
        DataType.isFunction(this.close) && this.close()
        this.hide()
        document.body.removeChild(this.$refs.modal.$el)
      }
    }
  }
</script>
