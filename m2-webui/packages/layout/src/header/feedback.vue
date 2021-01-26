<template>
  <fragment>
    <m2-link :text="$st('m2.layout.links.feedback')"/>
  </fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment'
  import { locale } from 'mixins'
  import M2Link from 'packages/link'

  export default {
    name: 'm2-feedback',
    mixins: [locale],
    components: {
      M2Link,
      Fragment
    }
  }
</script>
