## Alert 消息弹窗
> 当执行某些操作时自定义消息弹出框。

### 基础用法

消息弹窗

:::demo
```html
<template>
  <el-button @click="handleSubmit(false)">提交</el-button>
  <el-button @click="handleSubmit(true)">提交(自定义配置)</el-button>
  <el-button @click="$m2.alert('成功！')">提交(简洁用法)</el-button>
</template>

<script>
  export default {
    methods: {
      handleSubmit(custom) {
        const options = custom ? {
          title: '消息提示',
          message: '提交成功！',
          size: 'md',
          close() {
            alert('点击了关闭按钮')
          }
        } : {}
        this.$m2.alert(options)
      }
    }
  }
</script>
```
:::

### Prompt Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 弹窗的标题 | string | — | 删除提示 |
| message | 弹窗的消息 | string | — | 此操作将永久删除该数据, 是否继续? |
| size | 弹窗的尺寸 | string | sm/md/lg/xl | sm |
| close | 当点击"关闭"按钮时触发 | function | — | — |
