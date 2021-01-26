<template>
  <div class="m2-exception" :class="mClass">
    <div class="wrapper">
      <img :src="imgUrl" :alt="code" v-if="imgUrl"/>
      <div class="content">
        <slot>
          <p class="title">{{$st(`m2.exception.error.${code}`)}}</p>
          <div class="links">
            <m2-link v-if="code==='401'" :to="authority">{{$st('m2.exception.apply')}}</m2-link>
            <m2-link v-if="code==='404'" @click="$router.back(-1)" >{{$st('m2.exception.back')}}</m2-link>
            <span class="or">{{$st('m2.exception.or')}}</span>
            <m2-link to="/">{{$st('m2.exception.home')}}</m2-link>
          </div>
          <p class="info">{{$st('m2.exception.contactUs')}}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { locale, classes } from 'mixins'
  import M2Link from 'packages/link'

  export default {
    name: 'm2-exception',
    mixins: [locale, classes],
    components: {
      M2Link
    },
    props: {
      code: {
        type: String,
        required: true
      },
      authority: {
        type: String,
        default: '/authority'
      }
    },
    computed: {
      imgUrl() {
        if (this.code === '401') {
          return require('packages/theme-grace/img/401.png')
        } else if (this.code === '404') {
          return require('packages/theme-grace/img/404.png')
        }
        return ''
      }
    }
  }
</script>
