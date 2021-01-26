## Table 表格
> 基于Element Table二次封装（适用于大部分场景，复杂插件请使用el-table）。

### 基础用法

:::demo
```html
<template>
  <m2-table :columns="columns" :data="items" :index="false" :action="false" :show-header="false"/>
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

### 自定义表头 + 操作按钮 + 单/多选 + 可滚动 + 固定列

:::demo
```html
<template>
  <m2-table :columns="columns" :data="items" :index="false" :action="false" :radio="true" :checkbox="true" caption="用户列表" @selected="val=>selected=val" @selectedItem="val=>selectedItem=val">
    <template slot="header">
      <el-button type="primary" size="mini">新增用户</el-button>
      <el-button type="danger" size="mini" :disabled="!selected.length&&!selectedItem">批量删除</el-button>
    </template>
  </m2-table>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          { label: '姓名', prop: 'name', fixed: true },
          { label: '年龄', prop: 'age' },
          { label: '性别', prop: 'gender' },
          { label: '日期', prop: 'date', width: '150' },
          { label: '省份', prop: 'province' },
          { label: '市区', prop: 'city' },
          { label: '地址', prop: 'address', width: '300' },
          { label: '邮编', prop: 'zip' }
        ],
        items: [],
        selected: [],
        selectedItem: null
      }
    },
    created() {
      // 模拟异步
      Promise.resolve([{
        name: '王小虎',
        age: 32,
        gender: '男',
        date: '2016-05-02',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '男',
        date: '2016-05-04',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '男',
        date: '2016-05-01',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '男',
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

### 自定义显示列 + 序号列 + (固定)操作列 + 页脚 + 分页器

:::demo
```html
<template>
  <m2-table :columns="columns" :data="items" :pager="pager" :is-fixed-action="true">
    <template slot="gender" slot-scope="{row}">
      <i class="el-icon-male" v-if="row.gender==='男'"/>
      <i class="el-icon-female" v-else/>
    </template>
    <template slot="action">
      <el-button type="primary" size="mini" plain>编辑</el-button>
      <el-button type="danger" size="mini" plain>删除</el-button>
    </template>
    <template slot="footer">
      <el-alert title="此示例仅为模拟分页，真实场景需传参" type="success" :closable="false"/>
    </template>
  </m2-table>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          { label: '姓名', prop: 'name', fixed: true },
          { label: '年龄', prop: 'age' },
          { label: '性别', prop: 'gender', slot: true },
          { label: '日期', prop: 'date', width: '150' },
          { label: '省份', prop: 'province' },
          { label: '市区', prop: 'city' },
          { label: '地址', prop: 'address', width: '300' },
          { label: '邮编', prop: 'zip' }
        ],
        items: [],
        pager: {
          current: 1,
          size: 10,
          total: 0
        }
      }
    },
    created() {
      // 模拟异步
      Promise.resolve([{
        name: '王小虎',
        age: 32,
        gender: '女',
        date: '2016-05-02',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '男',
        date: '2016-05-04',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '男',
        date: '2016-05-01',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '女',
        date: '2016-05-03',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '女',
        date: '2016-05-02',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '男',
        date: '2016-05-04',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '男',
        date: '2016-05-01',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '女',
        date: '2016-05-03',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '男',
        date: '2016-05-01',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        name: '王小虎',
        age: 32,
        gender: '女',
        date: '2016-05-03',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]).then(res => {
        this.items = res || []
        this.pager.total = 50
      })
    }
  }
</script>
```
:::

### Table Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| columns | 列头配置(详细配置见Table Columns) | array | — | — |
| data | 数据源(同步或异步) | array | — | — |
| pager | 分页器配置(current,size,total) | object | — | — |
| showHeader | 是否显示表头 | boolean | — | true |
| showFooter | 是否显示表尾 | boolean | — | true |
| caption | 表头标题 | string | — | '列表' |
| radio | 是否显示单选列 | boolean | — | false |
| checkbox | 是否显示多选列 | boolean | — | false |
| index | 是否显示序号列 | boolean | — | true |
| action | 是否显示操作列 | boolean | — | true |
| actionWidth | 操作列宽度(默认配置两个按钮) | number | — | 150 |
| rowClassName | 行样式 | string | — | — |
| isFixedAction | 是否固定操作列 | boolean | — | false |

### Table Events
| 事件名称      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| selected | 当选中行触发(点击header可全选或清除全选) | — |
| selectedItem | 当选中某一行触发(点击header可清除所选) | — |

### Table Columns
| 属性      | 说明
|---------- |-------------------------------- |
| label | 列显示名称 |
| prop | 需要绑定的列 |
| slot | 是否需要自定义显示单元列(默认false) |
| width | 指定列宽(默认自适应) |
| fixed | 是否需要固定列(默认false) |

### Table Slots
| 名称      | 说明
|---------- |-------------------------------- |
| header | 自定义表头右上角区域 |
| action | 自定义操作列区域 |
| footer | 自定义页脚区域 |
| [column.prop] | 自定义单元列区域(插槽名为columns中配置的prop) |
