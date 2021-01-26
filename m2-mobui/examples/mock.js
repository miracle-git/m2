export const NAVBAR_MENUS = {
  map: {
    url: 'link'
    // text: 'content'
  },
  data: [
    { "link": "https://www.baidu.com/", "text": "应用名称11111111111111111111111111111111111" },
    { "link": "/oa", "text": "应用名称2", "target": "_self" },
    { "link": "https://www.baidu.com/", "text": "应用名称3", "target": "_self" },
    { "link": "http://test.app.com/04", "text": "应用名称4" },
    { "link": "http://test.app.com/05", "text": "应用名称5" },
    { "link": "http://test.app.com/06", "text": "应用名称666666666666666666666666" },
    { "link": "http://test.app.com/07", "text": "应用名称7" },
    { "link": "http://test.app.com/08", "text": "应用名称8" }
  ]
}
export const AVATAR_MENUS = {
  url: 'http://test.app.com/user/zhangsan',
  // avatarUrl: 'examples/assets/img/avatar.png',
  map: {
    url: 'link',
    text: 'name'
  },
  data: [
    { name: '菜单1', link: 'http://test.app.oa.com/info', type: 'info' },
    { name: '菜单2', link: 'http://test.app.oa.com/info', disabled: true },
    { name: '退出', divided: true, type: 'exit' } // 需要分隔一下
  ]
}
export const SIDEBAR_MENUS = {
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
    { "id": "tn-01", "name": "菜单1", "link": "https://test.app.com/01", "icon": "el-icon-place", "parentId": "0", "level": 1 },
    { "id": "tn-02", "name": "菜单2", "link": "https://test.app.com/02", "icon": "el-icon-user", "parentId": "0", "level": 1 },
    {
      "id": "tn-03",
      "name": "菜单3",
      "icon": "el-icon-coordinate",
      "parentId": "0",
      "level": 1,
      "children": [
        { "id": "tn-03-01", "name": "菜单31", "link": "https://test.app.com/31", "parentId": "tn-03", "level": 2 },
        { "id": "tn-03-02", "name": "菜单32", "link": "https://test.app.com/32", "parentId": "tn-03", "level": 2 },
        { "id": "tn-03-03", "name": "菜单33", "link": "https://test.app.com/33", "parentId": "tn-03", "level": 2 }
      ]
    },
    { id: 'tn-04', name: '不跳转', click: (item) => { alert(`这是一个自定义事件的链接: ${item.key}`) }, parentId: '0', level: 1 },
    {
      id: 'tn-05',
      name: '子菜单',
      parentId: '0',
      level: 1,
      children: [
        { id: 'tn-05-01', name: '不跳转2', click: (item) => { alert(`这是一个自定义事件的链接: ${item.key}`) }, parentId: 'tn-11', level: 2 }
      ]
    }
  ]
}
