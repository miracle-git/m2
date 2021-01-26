## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [<font color=#409EFF>webpack</font>](https://webpack.js.org/) 打包工具配合使用。

```shell
npm install m2-mobui
```
### npm 安装脚手架
推荐使用 m2-cli 脚手架搭建项目

```shell
npm install m2-cli -g
```

### 利用脚手架创建新工程

- 通过**m2**命令行一键下载项目脚手架
```bash
m2 init (也可使用别名m2 i)
```
- 然后会依次提示您输入项目名称，描述，作者等信息(不输入将采用默认值)
- 选择项目类型为**web|mob|mfe**，回车开始下载项目模板
- 其中m2基于m2-webui模板，mob基于m2-mobui模板[<font color=#f81d22>开发中，不建议使用</font>]，mfe基于微前端模板
- 当出现**项目创建成功**表示项目脚手架已下载成功
- 按照操作指引安装依赖，运行项目即可
- 接下来，就开始你的快乐编程之旅把!

- *提示：如果你忘记修改项目名称，描述等信息，可直接下载完成后修改package.json中的name,title,author,description以及repository.url*

### 部署

- 如果使用m2-cli脚手架搭建的项目，按照对用的指令打包即可。

```bash
npm run build:dev (打包开发/测试环境)
npm run build:prd (打包生产环境)
```

- 如果只单独使用M2 MobUI，需要在项目public/index.html下配置全局变量。

```js
window.M2_BUILD_ENV = 'dev' // 打包开发/测试环境
window.M2_BUILD_ENV = 'prd' // 打包生产环境
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= webpackConfig.name %></title>
    <meta charset="utf-8" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"/>
    <link href="<%= BASE_URL %>favicon.ico" rel="icon" />
    <script>
      window.M2_BUILD_ENV = 'dev' // 打包开发/测试环境
      window.M2_BUILD_ENV = 'prd' // 打包生产环境
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
