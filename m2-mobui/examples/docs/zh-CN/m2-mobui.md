## m2-mobui
[![](https://img.shields.io/badge/m2--mobui-v1.0.1-green.svg)](https://github.com/miracle-git/m2.git) <br/>
> 基于Vue创建的业务中台Mob端组件库。

### 安装
```bash
npm install m2-mobui
```

### 引入
可以采取以下三种引入方式：
- 全量引入
- 按需引入
- CDN引入

#### 全量引入

在 main.js 中写入以下内容：

```javascript
import '~m2-mobui/lib/theme-grace/index.css' // 也可放在App.vue中引入
import Vue from 'vue'
import M2 from 'm2-mobui'
import App from './App.vue'

Vue.use(M2);

new Vue({
  el: '#app',
  render: h => h(App)
})
```

**注意：样式文件需要单独引入(此时不要在babel中配置按需加载选项)。**

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

接下来，如果你只希望引入部分组件，比如 只需要引入素材通用模块中的Content（latex转义html解析），那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import { RouterView, Modal, Link } from 'm2-mobui'
import App from './App.vue'

Vue.component(RouterView.name, RouterView)
Vue.component(Modal.name, Modal)
Vue.component(Link.name, Link)

/* 或写为
 * Vue.use(RouterView)
 * Vue.use(Modal)
 * Vue.use(Link)
 */

new Vue({
  el: '#app',
  render: h => h(App)
})
```

**注意：按需加载不需要单独引入样式文件。**

#### CDN引入
首先配置webpack.base.conf.js (也可在默认的webpack.config.js） 将m2-mobui加入到externals中：
```javascript
module.exports = {
  ...,
  externals: {
    'm2-mobui': 'M2'
  }
}
```
**注意：CDN引入不需要安装m2-mobui。**

其次在main.js中引入m2-mobui：
```javascript
import Vue from 'vue'
import M2 from 'm2-mobui'

Vue.use(M2);
```
最后在index.html中引入对应的脚本与样式：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>M2 CDN引入</title>
    <link rel="stylesheet" href="./node_modules/m2-mobui/lib/theme-grace/index.css">
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script src="./node_modules/m2-mobui/lib/index.js"></script>
    <script src="./node_modules/m2-mobui/lib/umd/locale/zh-CN.js"></script>
  </body>
</html>
```
**注意：样式与脚本可在线上环境来自于CDN，开发环境引入本地即可。**
