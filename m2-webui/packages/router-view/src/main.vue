<template>
  <div class="m2-router-view">
    <div class="page-container" v-if="nested">
      <m2-view/>
    </div>
    <m2-view v-else/>
  </div>
</template>

<script>
  import M2View from './view'

  export default {
    name: 'm2-router-view',
    components: {
      M2View
    },
    props: {
      nested: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
