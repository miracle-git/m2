## RouterView 路由视图
> 统一普通的路由视图和带keep-alive的路由视图。只需要在路由的meta属性中配置keepAlive，将自动切换为带keep-alive功能。

### 基础用法

路由视图

:::demo
```html
<template>
  <m2-router-view/>
  <m2-router-view :nested="true"/>
</template>
```
:::

### RouterView Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| nested | 是否在路由视图中内嵌.page-container元素 | boolean | — | false |
