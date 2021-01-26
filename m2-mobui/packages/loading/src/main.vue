<template>
  <div class="m2-loading">
    <transition name="fade">
      <div class="mask" v-show="visible">
        <div class="spinner">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div class="text">{{message || $st('m2.loading')}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { locale } from 'mixins'

  export default {
    name: 'm2-loading',
    mixins: [locale],
    data() {
      return {
        visible: false,
        message: ''
      }
    }
  }
</script>
