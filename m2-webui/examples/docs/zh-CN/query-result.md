## QueryResult 查询结果容器
> 查询结果列表存放区域。

### 基础用法

:::demo
```html
<template>
  <m2-query-result>
    <m2-table :columns="columns" :data="items" :index="false" :action="false" :show-header="false"/>
  </m2-query-result>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          { label: '姓名', prop: 'name', fixed: true },
          { label: '日期', prop: 'date', width: '150' },
          { label: '省份', prop: 'province' },
          { label: '市区', prop: 'city' },
          { label: '地址', prop: 'address', width: '300' },
          { label: '邮编', prop: 'zip' }
        ],
        items: []
      }
    },
    created() {
      // 模拟异步
      Promise.resolve([{
        name: '王小虎',
        date: '2016-05-03',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name: '王小虎',
        date: '2016-05-04',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        name: '王小虎',
        date: '2016-05-01',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        name: '王小虎',
        date: '2016-05-03',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]).then(res => {
        this.items = res
      })
    }
  }
</script>
```
:::

### QueryResult Slots
| 名称      | 说明
|---------- |-------------------------------- |
| — | 自定义查询结果内部元素区域 |
