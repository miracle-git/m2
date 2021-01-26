## Link 链接
> 统一超链接(a)和路由链接(router-link)。

### 基础用法

普通链接

:::demo
```html
<template>
  <m2-link to="https://github.com/miracle-git/m2" text="M2 Github"/>
</template>
```
:::

路由链接

 :::demo
 ```html
 <template>
   <m2-link to="#/zh-CN/component/quickstart" text="M2 MobUI快速入门"/>
 </template>
 ```
 :::

 点击非跳转

 :::demo
 ```html
 <template>
   <m2-link text="点我试一试" @click="handleClick"/>
 </template>

 <script>
  export default {
    methods: {
      handleClick() {
        alert('我不跳转，你想做啥都可以...')
      }
    }
  }
 </script>
 ```
 :::

带提示语链接

 :::demo
 ```html
 <template>
   <m2-link to="#/zh-CN/component/quickstart" text="移上来看一看" tooltip="这里可以学习M2 MobUI的所有技能..."/>
 </template>
 ```
 :::

 图标链接

  :::demo
  ```html
  <template>
    <m2-link to="#/zh-CN/component/quickstart" tooltip="这里可以学习M2 MobUI的所有技能...">
      <i class="el-icon-setting"></i>
    </m2-link>
  </template>
  ```
  :::

### Link Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| to | 链接跳转地址(可为/或#/开头的路由，也可为url如http://www.baidu.com)，如未配置则默认: javascript:void(0) | string | — | — |
| text | 链接文本 | string | — | — |
| target | 是否打开新页面 | string | _self/_blank | 当to为路由地址时默认为_self，当to为url时默认为_blank |
| tag | 渲染标签名(仅为路由链接有效) | string | — | a |
| tooltip | 是否显示提示语 | boolean/string | — | false |
| position | 提示语出现位置(参见el-tooltip的placement) | string | — | bottom |
| popper | 提示语样式设置 | string | — | — |
| visible | 提示语是否可见 | boolean | — | false |
| effect | 提示语效果 | string | dark/light | light |
| mClass | 外部样式类 | string | — | — |

### Link Events
| 事件名称      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| click | 当输入链接时触发 | — |
