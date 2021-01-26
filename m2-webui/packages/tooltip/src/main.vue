<template>
  <el-tooltip
    class="m2-tooltip"
    ref="tooltip"
    :disabled="disabled"
    v-bind="$attrs">
    <slot/>
  </el-tooltip>
</template>

<script>
  export default {
    name: 'm2-tooltip',
    data() {
      return {
        disabled: false
      }
    },
    mounted() {
      this.handleTooltip()
    },
    methods: {
      handleTooltip() {
        this.$nextTick(() => {
          const $tooltip = this.$refs.tooltip
          if (!$tooltip || !$tooltip.$el) return
          const tooltipNode = $tooltip.$el
          let targetNode
          if (tooltipNode.hasAttribute('m-tooltip') &&
            tooltipNode.getAttribute('m-tooltip') !== 'false') {
            console.log('xx')
            targetNode = tooltipNode
          } else {
            console.log('yy')
            targetNode = tooltipNode.querySelector('[m-tooltip^="false"]')
          }
          console.log(targetNode)
          if (targetNode) {
            this.disabled = !this.isTextOverflow(targetNode)
          }
        })
      },
      isTextOverflow(targetNode) {
        try {
          const { clientWidth, scrollWidth } = targetNode
          return scrollWidth > clientWidth
        } catch (e) {
          return false
        }
      }
    }
  }
</script>
