## Layout 布局
> 统一布局组件，分为顶部区域(Header)和内容区域(Content)两部分。

### 顶部区域(Header)

包含5个插槽：
- `header-logo`
- `header-menus`
- `header-links`
- `header-icons`
- `header-avatar`
- 每块都可以独立配置，如果不配置则显示默认内容。
- 也可指定需要渲染的区域`headerLayout`: `logo`、`menus`、`links`、`icons`、`avatar`，同时也可传入对应的数据`navbarMenus`、`avatarMenus`来渲染。

### 内容区域(Content)

包含2个插槽：
- `content-sidebar`
- `content-main`
- 每块都可以独立配置，如果不配置则显示默认内容。
- 也可指定需要渲染的区域`contentLayout`: `sidebar`，同时也可传入对应的数据`sidebarbarMenus`来渲染。

### 菜单配置
菜单包含3部分
- `narbar-menu(导航栏)`
- `avatar-menu(头像，仅限于外网)`
- `sidebar-menu(侧边栏)`。
- 每一块的配置至少包含两部分：`map`、`data`。
- 其中map处理应用数据与框架字段映射，data来自实际的菜单数据，每个菜单项可配置：`url`、`text`、`icon`、`click`等。

### 基础用法

内网布局（包含logo,search,feedback,links,sidebar）

:::demo 使用 `scope` 属性来设置内网(oa,默认)或外网(oc), `navbarMenus`来设置指定的导航栏菜单，`sidebarMenus`来设置指定的侧边栏菜单，`headerLayout`来设置header布局可选区(['logo','search','feedback','links'])，`contentLayout`来设置content布局可选区(['sidebar'])。
```html
<template>
  <m2-layout :header-layout="['logo', 'search', 'feedback', 'links']" :navbar-menus="navbarMenus" :sidebar-menus="sidebarMenus" @toggleCollapse="handleToggleCollapse"/>
</template>
<script>
  export default {
    data() {
      return {
        navbarMenus: {
          map: {
            url: 'link'
            // text: 'content'
          },
          data: [
            { link: 'https://test.app.com/', text: '应用名称1' },
            { link: '/demo', text: '应用名称2' } // 如果在当前窗口打开，则配置target
          ]
        },
        sidebarMenus: {
          active: 'tn-01',
          map: {
            key: 'id',
            text: 'name',
            url: 'link',
            // level: 'level',
            // children: 'children',
            pid: 'parentId',
            root: '0'
          },
          data: [
            { id: 'tn-01', name: '菜单1', link: 'https://test.app.com/01', icon: 'el-icon-place', parentId: '0', level: 1 },
            { id: 'tn-02', name: '菜单2', link: 'https://test.app.com/02', icon: 'el-icon-user', parentId: '0', level: 1 },
            {
              id: 'tn-03',
              name: '菜单3',
              icon: 'el-icon-coordinate',
              parentId: '0',
              level: 1,
              children: [
                { id: 'tn-03-01', name: '菜单31', link: 'https://test.app.com/31', parentId: 'tn-03', level: 2 },
                { id: 'tn-03-02', name: '菜单32', link: 'https://test.app.com/32', parentId: 'tn-03', level: 2 },
                { id: 'tn-03-03', name: '菜单33', link: 'https://test.app.com/33', parentId: 'tn-03', level: 2 }
              ]
            }
          ]
        }
      }
    },
    methods:{
      handleToggleCollapse(collapse){
        console.log('sidebar toggle',collapse)
      }
    }
  }
</script>
```
:::

外网布局（包含logo,menus,icons,avatar,sidebar）

:::demo 使用 `scope` 属性来设置内网(oa,默认)或外网(oc), `navbarMenus`来设置指定的导航栏菜单，`avatarMenus`来设置指定的头像菜单，`sidebarMenus`来设置指定的侧边栏菜单，`headerLayout`来设置header布局可选区(['logo','menus','icons','avatar'])，`contentLayout`来设置content布局可选区(['sidebar'])。
```html
<template>
  <m2-layout scope="oc" :navbar-menus="navbarMenus" :avatar-menus="avatarMenus" :sidebar-menus="sidebarMenus"/>
</template>
<script>
  export default {
    data() {
      return {
        navbarMenus: {
          map: {
            url: 'link'
            // text: 'content'
          },
          data: [
            { link: 'https://test.app.com/', text: '应用名称1' },
            { link: '/oa', text: '应用名称2' } // 如果在当前窗口打开，则配置target
          ]
        },
        avatarMenus: {
          url: 'http://test.app.com/user/zhangsan',
          avatarUrl: 'examples/assets/img/avatar.png',
          map: {
            url: 'link',
            text: 'name'
          },
          data: [
            { name: '菜单1', link: 'http://test.app.com/01', type: 'info' },
            { name: '菜单2', link: 'http://test.app.com/02', disabled: true },
            { name: '退出', divided: true, type: 'exit' } // 需要分隔一下
          ]
        },
        sidebarMenus: {
          active: 'tn-01',
          map: {
            key: 'id',
            text: 'name',
            url: 'link',
            // level: 'level',
            // children: 'children',
            pid: 'parentId',
            root: '0'
          },
          data: [
            { id: 'tn-01', name: '菜单1', link: 'https://test.app.com/01', icon: 'el-icon-place', parentId: '0', level: 1 },
            { id: 'tn-02', name: '菜单2', link: 'https://test.app.com/02', icon: 'el-icon-user', parentId: '0', level: 1 },
            {
              id: 'tn-03',
              name: '菜单3',
              icon: 'el-icon-coordinate',
              parentId: '0',
              level: 1,
              children: [
                { id: 'tn-03-01', name: '菜单31', link: 'https://test.app.com/31', parentId: 'tn-03', level: 2 },
                { id: 'tn-03-02', name: '菜单32', link: 'https://test.app.com/32', parentId: 'tn-03', level: 2 },
                { id: 'tn-03-03', name: '菜单33', link: 'https://test.app.com/33', parentId: 'tn-03', level: 2 }
              ]
            }
          ]
        }
      }
    }
  }
</script>
```
:::

### Layout Attributes
| 参数            | 说明                     | 类型    | 可选值                                             | 默认值                                                                                          |
| --------------- | ------------------------ | ------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| scope           | 布局类型(内网、外网)     | string  | oa/oc                                              | oa                                                                                              |
| headerLayout    | Header可选显示区域       | array   | logo/menus/search/feedback/links/icons/avatar | 内网：['logo', 'menus', 'search', 'feedback', 'links'], <br>外网: ['logo', 'menus', 'icons', 'avatar'] |
| contentLayout   | Content可选显示区域      | array   | sidebar                                            | ['sidebar']                                                                                     |
| navbarMenus     | 导航栏菜单配置           | object  | —                                                  | —                                                                                               |
| avatarMenus     | 头像菜单配置(仅限于外网) | object  | —                                                  | —                                                                                               |
| sidebarMenus    | 侧边栏菜单配置           | object  | —                                                  | —                                                                                               |
| sidebarCollapse | 侧边栏菜单是否默认折叠   | boolean | —                                                  | false                                                                                           |                                                | —                                                                                               |

### Layout Events
| 事件名称       | 说明                             | 回调参数          |
| -------------- | -------------------------------- | ----------------- |
| search         | 当输入关键字回车时触发           | 输入关键字keyword |
| avatar         | 点击头像子菜单时触发(仅限于外网) | 子菜单类型type    |
| toggleCollapse | 左侧菜单切换展开折叠时回调       | 是否收起菜单      |


### Layout Slots
| 名称            | 说明                       |
| --------------- | -------------------------- |
| header-logo     | 自定义logo                 |
| header-menus    | 自定义导航栏               |
| header-icons    | 自定义右侧图标(仅限于外网) |
| header-links    | 自定义右侧链接(仅限于内网) |
| header-avatar   | 自定义右侧头像(仅限于外网) |
| content-sidebar | 自定义侧边栏               |
| content-main    | 自定义主体内容区           |
