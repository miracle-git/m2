## Exception 页面异常
> 通用异常页面(如401, 404等)配置。

### 基础用法

401无权限

:::demo 使用 `code` 属性来设置异常类型，可选值："401"(无权限)、"404(出错页面)"，`authority`属性设置无权限时跳转的页面。
```html
<template>
  <m2-exception code="401" authority="/401"/>
</template>
```
:::

404出错页面

:::demo 使用 `code` 属性来设置异常类型，可选值："401"(无权限)、"404(出错页面)"。
```html
<template>
  <m2-exception code="404"/>
</template>
```
:::

### Exception Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| code | 异常类型 | string | 401/404 | — |
| authority | 无权限跳转页面 | string | — | /authority |
| mClass | 外部样式类 | string | — | — |

### Exception Slots
| 名称      | 说明
|---------- |-------------------------------- |
| — | 自定义右侧内容 |
