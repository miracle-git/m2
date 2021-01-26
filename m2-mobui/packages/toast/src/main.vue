<template>
  <div class="m2-toast">
    <transition name="fade">
      <div class="toast" v-show="visible">
        <span>{{message || $st('m2.toast')}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
  import { locale } from 'mixins'

  export default {
    name: 'm2-toast',
    mixins: [locale],
    data() {
      return {
        visible: false,
        message: ''
      }
    }
  }
</script>
