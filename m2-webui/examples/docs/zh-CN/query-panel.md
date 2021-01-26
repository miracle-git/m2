## QueryPanel 查询条件面板
> 适用于多条件组合查询时配置整体布局时使用。

### 基础用法

:::demo
```html
<template>
  <m2-query-panel mode="inline" :form="userForm" :pager="pager">
   <el-form-item label="员工名称" prop="StaffName">
     <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
   </el-form-item>
  </m2-query-panel>
</template>
<script>
  export default {
    data() {
      return {
        userForm: {
          StaffName: ''
        },
        pager: {
          current: 1,
          size: 10
          // event: 'user-list-query'
        }
      }
    }
  }
</script>
```
:::

### 多条件查询

:::demo
```html
<template>
  <m2-query-panel :form="userForm" :pager="pager">
    <el-row :gutter="10">
      <el-col :span="grid.search.$1">
        <el-form-item label="员工名称" prop="StaffName">
          <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
        </el-form-item>
      </el-col>
      <el-col :span="grid.search.$2">
        <el-form-item label="员工名称" prop="StaffName">
          <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
        </el-form-item>
      </el-col>
      <el-col :span="grid.search.$3">
        <el-form-item label="员工名称" prop="StaffName">
          <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
        </el-form-item>
      </el-col>
      <el-col :span="grid.search.$4">
        <el-form-item label="员工名称" prop="StaffName">
          <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
        </el-form-item>
      </el-col>
      <el-col :span="grid.search.$5">
        <el-form-item label="员工名称" prop="StaffName">
          <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
        </el-form-item>
      </el-col>
      <el-col :span="grid.search.$6">
        <el-form-item label="员工名称" prop="StaffName">
          <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
        </el-form-item>
      </el-col>
      <el-col :span="grid.search.$7">
        <el-form-item label="员工名称" prop="StaffName">
          <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
        </el-form-item>
      </el-col>
      <el-col :span="grid.search.$8">
        <el-form-item label="员工名称" prop="StaffName">
          <el-input v-model="userForm.StaffName" placeholder="请输入员工名称" clearable/>
        </el-form-item>
      </el-col>
    </el-row>
  </m2-query-panel>
</template>
<script>
  // 实战项目中请引入responsive mixin以及调用initGridLayout
  // import { responsive } from 'm2-vue'

  export default {
    // mixins: [responsive],
    data() {
      return {
        userForm: {
          StaffName: ''
        },
        pager: {
          current: 1,
          size: 10
          // event: 'user-list-query'
        },
        // grid: this.initGridLayout(8)
        grid: {
          search: {
            $1: 8, $2: 8, $3: 8, $4: 8,
            $5: 8, $6: 8, $7: 8, $8: 8
          }
        }
      }
    }
  }
</script>
```
:::

### QueryPanel Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| mode | 显示模式(内联/块级) | string | inline/block | block |
| form | 当前查询表单 | object | — | — |
| pager | 分页器配置(current,size,event) | object | — | — |
| queryEvent | 自定义查询事件名 | string | — | query |
| labelWidth | 表单元素文本宽度 | string | — | 80px |
| grid | 响应式网格布局对象(仅适用于块级) | object | — | — |
| queryText | 查询按钮文本 | string | — | 查询 |
| resetText | 重置按钮文本 | string | — | 重置 |

### QueryPanel Events
| 事件名称      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| query | 当点击查询按钮时触发(若配置queryEvent，则事件名为配置的名称) | — |

### QueryPanel Slots
| 名称      | 说明
|---------- |-------------------------------- |
| — | 自定义查询表单内部元素区域 |
