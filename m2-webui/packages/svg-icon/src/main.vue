<template>
  <span :class="svgClass" @click="$emit('click')">
    <svg :class="iconClass" :style="svgStyle" aria-hidden="true">
      <use :xlink:href="iconName" :class="strokeClass"></use>
    </svg>
  </span>
</template>

<script>
  import { classes } from 'mixins'

  export default {
    name: 'm2-svg-icon',
    mixins: [classes],
    props: {
      name: {
        type: String,
        required: true
      },
      size: {
        type: String,
        default: 'sm' // sm, md, lg, xl
      },
      prefix: {
        type: String,
        default: 'icon-'
      },
      width: {
        type: String,
        default: ''
      },
      height: {
        type: String,
        default: ''
      }
    },
    computed: {
      iconName() {
        return `#${this.prefix}${this.name}`
      },
      iconClass() {
        return `svg-${this.size}`
      },
      strokeClass() {
        return this.name === 'unit' ? 'stroke' : ''
      },
      svgClass() {
        return this.mClass ? `m2-svg-icon ${this.mClass}` : 'm2-svg-icon'
      },
      svgStyle() {
        const style = {}
        if (this.width) {
          style.width = this.width
        }
        if (this.height) {
          style.height = this.height
        }
        return style
      }
    }
  }
</script>
