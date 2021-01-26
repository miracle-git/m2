## Modal 弹窗
> 当执行某些操作(如新增、编辑等)时自定义弹出框。

### 基础用法

弹窗

:::demo
```html
<template>
  <el-button @click="openModal('add')">无滚动条</el-button>
  <el-button @click="openModal('edit', { size: 'lg' })">有滚动条</el-button>
  <el-button @click="openModal('add', { size: 'sm' })">超小弹窗</el-button>
  <el-button @click="openModal('edit', { size: 'lg' })">大弹窗</el-button>
  <el-button @click="openModal('edit', { size: 'xl' })">超大弹窗</el-button>
  <el-button @click="openModal('slot', { width: '750px' })">自定义宽度</el-button>
  <el-button @click="openModal('slot')">覆盖默认插槽</el-button>
  <m2-modal title="新增" ref="add" :size="size" @ok="handleOk">
    <p slot="body">
      这个是新增弹窗
    </p>
  </m2-modal>
  <m2-modal title="编辑" ref="edit" :size="size" :adaptive="true" @ok="handleOk">
    <p slot="body">
      <ul>
        <li v-for="n in 100" :key="n">条目{{n}}</li>
      </ul>
    </p>
  </m2-modal>
  <m2-modal ref="slot" :width="width" >
    <span slot="header" class="title">
      <i class="el-icon-plus"></i>
      新增
    </span>
    <p slot="body">
      这个是新增弹窗
    </p>
    <div slot="buttons">
      <el-button @click="handleClose()">关闭</el-button>
      <el-button type="primary">提交</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </m2-modal>
</template>

<script>
  export default {
    data() {
      return {
        size: '',
        width: ''
      }
    },
    methods: {
      openModal(name, { size = 'md', width = '600px'} = {}) {
        this.size = size
        width && (this.width = width)
        this.$refs[name].show()
      },
      handleOk() {
        alert('点击了确认按钮')
      },
      handleClose() {
        this.$refs.slot.hide()
      }
    }
  }
</script>
```
:::

### Modal Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 弹窗的标题 | string | — | — |
| size | 弹窗的尺寸 | string | sm/md/lg/xl | md |
| width | 弹窗的宽度(可为百分比或px,vw,rem,一旦设置size将失效) | string | — | — |
| adaptive | 是否自适应屏幕高度(内容超过弹窗高度) | boolean | — | false |
| showOk | 是否显示"确定"按钮 | boolean | — | true |
| showClose | 是否显示右上角"关闭"图标 | boolean | — | true |
| showHeader | 是否显示页头区域 | boolean | — | true |
| showFooter | 是否显示页脚区域 | boolean | — | true |
| okText | "确认"按钮文本 | string | — | 确认 |
| cancelText | "取消"按钮文本 | string | — | 取消 |
| mClass | 外部样式类 | string | — | — |

### Modal Events
| 事件名称      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| ok | 当点击"确认"按钮时触发 | — |
| cancel | 当点击"取消"按钮时触发 | — |
| close | 当点击右上角"关闭"图标时触发 | — |

### Modal Slots
| 名称      | 说明
|---------- |-------------------------------- |
| header | 自定义左上角标题区域 |
| body | 自定义弹窗内容区域 |
| footer | 自定义页脚区域 |
| buttons | 自定义页脚按钮 |
