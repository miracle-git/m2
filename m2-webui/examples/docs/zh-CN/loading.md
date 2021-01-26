## Loading 数据加载器
> 通用加载器，通常用于发送请求时，也可自行调用。

### 基础用法

加载器

:::demo
```html
<template>
  <el-button @click="loading()">加载器</el-button>
  <el-button @click="loading('数据加载中,请稍后...')">自定义文本的加载器</el-button>
</template>

<script>
  export default {
    methods: {
      loading(message) {
        this.$m2.loading(message)
        setTimeout(() => {
          this.$m2.loading.hide()
        }, 1000)
      }
    }
  }
</script>
```
:::
