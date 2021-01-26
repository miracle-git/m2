<template>
  <fragment>
    <m2-link><i class="el-icon-setting"></i></m2-link>
    <m2-link><i class="el-icon-bell"></i></m2-link>
  </fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import M2Link from 'packages/link'

  export default {
    name: 'm2-icons',
    components: {
      Fragment,
      M2Link
    }
  }
</script>
