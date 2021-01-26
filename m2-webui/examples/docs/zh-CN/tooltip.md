## Tooltip 提示文字
> 基于Element Tooltip根据元素内容长度实现动态文字提示。

### 基础用法

在项目中有可能存在多个兄弟元素内容不一致，有时需要截断处理，同时对该元素增加tooltip，其他元素维持原样。

:::demo 使用 `m-tooltip` 属性来设置需要添加tooltip的元素。
```html
<template>
  <div>
    <m2-tooltip v-for="(item, index) in items" :key="index" :content="item.text" placement="top" effect="light">
      <div m-tooltip style="width: 150px;margin-bottom: 15px;" class="ellipsis">{{item.text}}</div>
    </m2-tooltip>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: [
          { id: 1, text: '这是一段很长很长很长的文本' },
          { id: 2, text: '这是一段普通文本' }
        ]
      }
    }
  }
</script>
```
:::

> 提示：<font color=#f81d22>组件使用方式与el-tooltip完全一致。</font><br>
> tooltip 内不支持 router-link 组件，请使用 vm.$router.push 代替。<br>
> tooltip 内不支持 disabled form 元素，参考MDN，请在 disabled form 元素外层添加一层包裹元素。
