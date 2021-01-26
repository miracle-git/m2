## Toast 消息提示
> 贡献者：miraclehe(何名宇)；最近更新时间：2020-10-13；

消息提示，通常用于执行某些操作后给用户一些友好的提示语。

### 基础用法

加载器

:::demo
```html
<template>
  <el-button @click="toast('发送成功')">消息提示</el-button>
  <el-button @click="toast('发送成功', 3000)">3秒后消失的消息提示</el-button>
</template>

<script>
  export default {
    methods: {
      toast(message, duration = 2000) {
        this.$m2.toast(message, duration)
      }
    }
  }
</script>
```
:::
