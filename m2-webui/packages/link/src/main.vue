<template>
  <fragment>
    <el-tooltip class="item" :effect="effect" :content="tooltipContent" :placement="position" v-if="tooltip" :popper-class="popper" :disabled="visible">
      <router-link v-if="routeLink" :to="toLink" :tag="tag" :class="mClass"><slot>{{text}}</slot></router-link>
      <a v-else :href="toLink" :target="targetType" @click="$emit('click')" :class="mClass"><slot>{{text}}</slot></a>
    </el-tooltip>
    <fragment v-else>
      <router-link v-if="routeLink" :to="toLink" :tag="tag" :class="mClass"><slot>{{text}}</slot></router-link>
      <a v-else :href="toLink" :target="targetType" @click="$emit('click')" :class="mClass"><slot>{{text}}</slot></a>
    </fragment>
  </fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import { DataType } from 'm2-core'
  import { oneOf, isRouteLink } from 'm2-webui/src/utils/main'
  import { classes } from 'mixins'

  export default {
    name: 'm2-link',
    mixins: [classes],
    components: {
      Fragment
    },
    props: {
      to: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      tag: {
        type: String,
        default: 'a'
      },
      target: {
        type: String,
        default: ''
      },
      tooltip: {
        type: [Boolean, String],
        default: false
      },
      position: {
        type: String,
        default: 'bottom',
        validator(val) {
          return val && oneOf(val, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'], 'position')
        }
      },
      popper: String,
      visible: {
        type: Boolean,
        default: false
      },
      effect: {
        type: String,
        default: 'light'
      }
    },
    computed: {
      routeLink() {
        return isRouteLink()
      },
      toLink() {
        if (!this.to) {
          return 'javascript:void(0)'
        }
        return this.to
      },
      targetType() {
        if (!this.target) {
          if (!this.to) {
            return '_self'
          }
          if (/^https?:\/\//.test(this.to)) {
            return '_blank'
          }
        }
        return this.target
      },
      tooltipContent() {
        if (DataType.isString(this.tooltip)) {
          return this.tooltip
        }
        return this.text
      }
    }
  }
</script>
