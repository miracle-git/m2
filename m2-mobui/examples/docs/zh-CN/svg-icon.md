## SvgIcon 图标
> 自定义图标，通常用于当element-ui图标无法满足的前提下，使用自定义图标。

### 基础用法
:::demo
```html
  <m2-svg-icon name="staff"/>
```
:::

### 自定义图标大小

:::demo 通过`size`属性设置图标大小，`width`和`height`属性可以自定义图标大小。
```html
<template>
  <m2-svg-icon name="staff" @click="handleClick('小图标')" size="sm"/>
  <m2-svg-icon name="staff" @click="handleClick('中图标')" size="md"/>
  <m2-svg-icon name="staff" @click="handleClick('大图标')" size="lg"/>
  <m2-svg-icon name="staff" @click="handleClick('超大图标')" size="xl"/>
  <m2-svg-icon name="staff" @click="handleClick('自定义大小')" width="30px" height="30px"/>
</template>

<script>
  export default {
    methods: {
      handleClick(message) {
        alert(message)
      }
    }
  }
</script>
```
:::

### 自定义图标颜色
:::demo svg文件没有预设颜色时，可以通过css设置svg图标颜色。
```html
<template >
  <m2-svg-icon name="staff" size="md"/>
  <m2-svg-icon name="staff" size="md" customClass="custom-red"/>
  <m2-svg-icon name="staff" size="md" customClass="custom-green"/>
</template>
<style>
  .custom-red{
    color:#f81d22;
  }
  .custom-green{
    color: #70b758;
  }
</style>
```
:::


### 自定义svg图标文件
业务项目自定义SVG图标需要配合`svg-sprite-loader`使用，配置参考
```js
{
  test: /\.svg$/,
  include: [resolve('../../packages/theme-grace/icon')],
  use: [{
    loader: 'svg-sprite-loader',
    options: {
      symbolId: 'icon-[name]'
    }
  }]
}
```

### 内置图标
m2-mobui内置了一部分svg图标，引入SvgIcon组件即可使用
<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <p><m2-svg-icon :name="name" size="md" /></p>
      <span class="icon-name">{{name}}</span>
    </span>
  </li>
</ul>

### SvgIcon Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 图标名称(必须在指定svg目录配置) | string | — | — |
| size | 图标大小 | string | sm/md/lg/xl | sm |
| width | 图标宽度，优先级高于`size` | string | — | — |
| height | 图标高度，优先级高于`size` | string | — | — |
| prefix | 图标前缀(svg-sprite-loader配置) | string | — | icon- |
| mClass | 外部样式类 | string | — | — |

### SvgIcon Events
| 事件名称      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| click | 当点图标时触发 | — |
