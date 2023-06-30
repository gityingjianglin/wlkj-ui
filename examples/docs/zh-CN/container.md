## Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：

`<wl-container>`：外层容器。当子元素中包含 `<wl-header>` 或 `<wl-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列，默认flex-direction: row。

`<wl-header>`：顶栏容器。

`<wl-aside>`：侧边栏容器。

`<wl-main>`：主要区域容器。

`<wl-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<wl-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<wl-container>`。
:::

### 常见页面布局

:::demo
```html
<wl-container>
  <wl-header>Header</wl-header>
  <wl-main>Main</wl-main>
  <wl-footer>Footer</wl-footer>
</wl-container>

<wl-container>
  <wl-aside width="200px">Aside</wl-aside>
  <wl-main>Main</wl-main>
</wl-container>

<wl-container>
  <wl-header>Header</wl-header>
  <wl-container>
    <wl-aside width="200px">Aside</wl-aside>
    <wl-main>Main</wl-main>
  </wl-container>
</wl-container>

<wl-container>
  <wl-header>Header</wl-header>
  <wl-container>
    <wl-aside width="200px">Aside</wl-aside>
    <wl-container>
      <wl-main>Main</wl-main>
      <wl-footer>Footer</wl-footer>
    </wl-container>
  </wl-container>
</wl-container>

<wl-container>
  <wl-aside width="200px">Aside</wl-aside>
  <wl-container>
    <wl-header>Header</wl-header>
    <wl-main>Main</wl-main>
    <wl-footer>Footer</wl-footer>
  </wl-container>
</wl-container>
```
:::


### Container Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `wl-header` 或 `wl-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 300px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |