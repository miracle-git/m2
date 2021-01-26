<template>
  <div class="m2-container" :class="containerClass">
    <slot></slot>
  </div>
</template>

<script>
  import { oneOf } from 'm2-mobui/src/utils/main'
  import { classes } from 'mixins'

  export default {
    name: 'm2-container',
    mixins: [classes],
    props: {
      direction: {
        type: String,
        default: 'vertical', // horizontal, vertical
        validator(val) {
          return val && oneOf(val, ['horizontal', 'vertical'], 'direction')
        }
      }
    },
    computed: {
      containerClass() {
        return [this.mClass, this.direction === 'vertical' ? 'vertical' : '']
      }
    }
  }
</script>
