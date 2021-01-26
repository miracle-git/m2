<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/highlight.js@9.16.2/styles/color-brewer.css">
    <title>M2 MobUI</title>
  </head>
  <body>
    <script>
      if (!window.Promise) {
        document.write('<script src="//cdn.jsdelivr.net/npm/es6-promise@4.1.1/dist/es6-promise.min.js"><\/script><script>ES6Promise.polyfill()<\/script>')
      }
    </script>
    <div id="app"></div>
    <% if (process.env.NODE_ENV === 'production') { %>
      <script src="//cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.runtime.min.js"></script>
      <script src="//cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js"></script>
      <script src="//cdn.jsdelivr.net/npm/highlightjs@9.16.2/highlight.pack.min.js"></script>
    <% } %>
  </body>
</html>
