<style lang="less">
  .page-theme-preview {
    padding-top: 30px;
    .display {
      /* width: 75%; */
      display: inline-block;
      vertical-align: top;
      h3 {
        font-size: 28px;
        margin: 30px 0 0 0;
      }
    }
  }
</style>

<template>
  <div class="page-theme-preview" ref="themePreview">
    <section class="display">
      <basic-tokens-preview>
      </basic-tokens-preview>
      <!-- <components-preview>
      </components-preview> -->
    </section>
  </div>
</template>

<script>
  import BasicTokensPreview from '../../components/theme/basic-tokens-preview'
  // import ComponentsPreview from '../../components/theme/components-preview'

  export default {
    components: {
      BasicTokensPreview
    }
  }
</script>
