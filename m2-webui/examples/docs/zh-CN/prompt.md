## Prompt 确认弹窗
> 当执行某些操作(如删除等)时自定义确认弹出框。

### 基础用法

确认弹窗

:::demo
```html
<template>
  <el-button @click="handleDelete(false)">删除</el-button>
  <el-button @click="handleDelete(true)">删除(自定义消息)</el-button>
  <el-button @click="handleConfirm">删除(简洁用法)</el-button>
</template>

<script>
  export default {
    methods: {
      handleDelete(custom) {
        const options = custom ? {
          title: '删除',
          message: '删除了就没了，还要不要继续？',
          close() {
            alert('点击了关闭按钮')
          },
          cancel() {
            alert('点击了取消按钮')
          }
        } : {}
        this.$m2.prompt({
          ...options,
          confirm() {
            alert('点击了确认按钮')
          }
        })
      },
      handleConfirm() {
        this.$m2.prompt('确认要继续吗？', () => { alert('点击了确认按钮') })
      }
    }
  }
</script>
```
:::

### Prompt Attributes
| 参数    | 说明                                       | 类型     | 可选值 | 默认值                            |
| ------- | ------------------------------------------ | -------- | ------ | --------------------------------- |
| title   | 弹窗的标题                                 | string   | —      | 删除提示                          |
| message | 弹窗的消息                                 | string   | —      | 此操作将永久删除该数据, 是否继续? |
| confirm | 当点击"确认"按钮时触发                       | function | —      | —                                 |
| close   | 当点击"关闭"图标时触发(未配置将调用cancel)     | function | —      | —                                 |
| cancel  | 当点击"取消"按钮时触发                     | function | —      | —                                 |

### Prompt Methods
| 方法名称 | 说明         | 参数 |
| -------- | ------------ | ---- |
| hide     | 隐藏当前弹窗 | — |