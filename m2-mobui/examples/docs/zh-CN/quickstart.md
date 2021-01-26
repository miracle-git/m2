## 快速上手
> 本节将介绍如何在项目中使用 M2 MobUI。

### 使用 Starter Kit

我们提供了通用的[<font color=#409EFF>项目模板</font>](https://github.com/miracle-git/m2-web-app)，你可以直接使用。如果不希望使用我们提供的模板，请继续阅读。

### 引入 M2 MobUI

你可以引入整个 M2 MobUI，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 M2 MobUI。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import Element from 'element-ui';
import M2 from 'm2-mobui';
import 'm2-theme/lib/index.css';
import 'm2-mobui/lib/theme-grace/index.css';
import App from './App.vue';

Vue.use(Element);
Vue.use(M2);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
});
```

以上代码便完成了 M2 MobUI 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助 [<font color=#409EFF>babel-plugin-component</font>](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "m2-mobui",
        "styleLibraryName": "theme-grace"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 员工选择器，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { RouterView, Modal, Link } from 'm2-mobui'
import App from './App.vue'

Vue.use(Element)

Vue.component(RouterView.name, RouterView)
Vue.component(Modal.name, Modal)
Vue.component(Link.name, Link)

/* 或写为
 * Vue.use(RouterView)
 * Vue.use(Modal)
 * Vue.use(Link)
 */

// 如果需要使用全局loading, 可配置以下代码：
Vue.prototype.$m2 = {}
Vue.prototype.$m2.loading = Loading
Vue.prototype.$m2.loading.hide = Loading.hide

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 开始使用

至此，一个基于 Vue 和 M2 MobUI 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
