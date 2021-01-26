<template>
  <transition name="slide">
    <div class="m2-modal" :class="modalClass" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog" :style="{'width':modalDialogWidth,'max-height':modalHeight}">
        <div class="modal-header" v-if="showHeader">
          <slot name="header">
            <span class="title">{{title}}</span>
          </slot>
          <m2-svg-icon class="close" name="close" width="16px" height="16px" @click.native="hide('close')" v-if="showClose"/>
        </div>
        <div class="modal-body" :style="{'max-height':modalBodyHeight}">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer" v-if="showFooter">
          <slot name="footer">
            <div class="btn-group">
              <slot name="buttons">
                <el-button size="small" @click="hide('cancel')">{{cancelText || $st('m2.modal.cancel')}}</el-button>
                <el-button type="primary"  size="small" @click="$emit('ok')" v-if="showOk">{{okText || $st('m2.modal.ok')}}</el-button>
              </slot>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { locale, classes } from 'mixins'
  import M2SvgIcon from 'packages/svg-icon'

  export default {
    name: 'm2-modal',
    mixins: [locale, classes],
    components: {
      M2SvgIcon
    },
    props: {
      title: String,
      showClose: {
        type: Boolean,
        default: true
      },
      showOk: {
        type: Boolean,
        default: true
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'md' // sm, md, lg, xl
      },
      adaptive: {
        type: Boolean,
        default: false
      },
      width: String, // 对话框的指定宽度(或百分比)
      okText: String,
      cancelText: String
    },
    data: () => ({
      showModal: false,
      modalSizes: [
        { size: 'sm', value: '300px' },
        { size: 'md', value: '600px', default: true },
        { size: 'lg', value: '900px' },
        { size: 'xl', value: '1200px' }
      ]
    }),
    computed: {
      modalDialogWidth() {
        if (this.width) {
          const width = this.width + ''
          const units = ['%', 'px', 'vw', 'em', 'rem']
          return units.some(item => width.endsWith(item)) ? width : parseFloat(width) + 'px'
        }
        const item = this.modalSizes.find(item => item.size === this.size) || this.modalSizes.find(item => item.default)
        return item.value
      },
      modalBodyHeight() {
        return `${parseInt(this.modalHeight) - 100}px`
      },
      modalHeight() {
        return `${document.documentElement.clientHeight * 0.9}px`
      },
      modalClass() {
        return `${this.adaptive ? 'modal-scroll' : ''} ${this.mClass}`
      }
    },
    methods: {
      show() {
        this.showModal = true
      },
      hide(evt = '') {
        this.showModal = false
        this.$emit('reset')
        evt && this.$emit(evt)
      }
    }
  }
</script>
