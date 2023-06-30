<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="//shadow.elemecdn.com/npm/highlight.js@9.3.0/styles/color-brewer.css">
    <title>wlkj-ui - The world's most popular Vue UI framework</title>
    <meta name="description" content="wlkj-ui，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库" />
  </head>
  <body>
    <script>
      if (!window.Promise) {
        document.write('<script src="//cdn.jsdelivr.net/npm/es6-promise@4.1.1/dist/es6-promise.min.js"><\/script><script>ES6Promise.polyfill()<\/script>')
      }
    </script>
    <div id="app"></div>
    <% if (process.env.NODE_ENV === 'production') { %>
      <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.5.21/vue.runtime.min.js"></script>
      <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.0.1/vue-router.min.js"></script>
      <script src="https://cdn.bootcdn.net/ajax/libs/highlight.js/9.15.6/highlight.min.js"></script>
    <% } %>
  </body>
</html>
