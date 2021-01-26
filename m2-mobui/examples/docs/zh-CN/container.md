## Container 容器
> 将其他组件进行包裹，控制内部元素的浮动布局。

### 基础用法

设置布局

:::demo 使用 `direction` 属性来设置布局方向，可选值："vertical"(默认)、"horizontal"
```html
<template>
  <m2-container>
    <m2-link>链接1</m2-link>
    <m2-link>链接2</m2-link>
  </m2-container>
  <m2-container direction="horizontal">
    <m2-link>链接1</m2-link>
    <m2-link>链接2</m2-link>
  </m2-container>
</template>
```
:::

### Container Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| direction | 布局方向 | string | vertical/horizontal | vertical |
| mClass | 外部样式类 | string | — | — |
