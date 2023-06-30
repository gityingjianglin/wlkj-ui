## Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，待数据加载完成以后，移除骨架屏，展示最终页面效果。

### 基础用法

基础的骨架效果，首行会被渲染一个长度 33% 的段首。

:::demo 通过设置`rows`属性，配置骨架屏段落数量，以便更接近真实渲染效果。

```html
<template>
  <wl-skeleton :rows="5" />
</template>
```

:::

### 动画效果

显示动画效果。

:::demo

```html
<wl-skeleton :rows="4" animated />
```

:::

### 自定义样式

当您想要用自己定义的模板时，可以通过一个具名 Slot 来自己设定模板。
:::demo

```html
<template>
  <div style="display:flex;">
    <wl-skeleton style="width: 200px">
      <template slot="template">
        <wl-skeleton-item variant="image" style="width: 200px; height: 200px;" />
        <div style="padding: 14px 0;">
          <wl-skeleton-item variant="p" style="width: 50%" />
          <div
            style="display: flex; align-items: center; justify-items: space-between; margin-top:5px;"
          >
            <wl-skeleton-item variant="text" style="margin-right: 16px;" />
            <wl-skeleton-item variant="text" style="width: 30%;" />
          </div>
        </div>
      </template>
    </wl-skeleton>

    <wl-skeleton style="width: 200px; margin-left: 30px">
      <template slot="template">
        <div style="display:flex;">
          <wl-skeleton-item variant="image" style="width: 100px; height: 90px;" />
          <wl-skeleton-item variant="image" style="width: 100px; height: 90px;margin-left: 10px" />
        </div>
        <div style="display:flex; margin-top: 10px;">
          <wl-skeleton-item variant="image" style="width: 200px; height: 100px;" />
        </div>
        <div style="padding: 14px 0;">
          <wl-skeleton-item variant="p" style="width: 50%" />
          <div
            style="display: flex; align-items: center; justify-items: space-between; margin-top:5px;"
          >
            <wl-skeleton-item variant="text"  />
          </div>
        </div>
      </template>
    </wl-skeleton>
  </div>
</template>
```

:::

### Loading 状态

当 Loading 结束之后，我们往往需要显示真实的 UI，可以通过 `loading` 的值来控制是否显示真实的 DOM。然后通过
具名 Slot 来设置当 loading 结束之后需要展示的 UI。

:::demo

```html
<template>
  <div style="width: 500px">
    <p>
      <label style="margin-right: 16px;">切换 Loading</label>
      <wl-switch v-model="loading"></wl-switch>
    </p>
    <wl-skeleton style="width: 200px" :loading="loading" animated>
      <template slot="template">
        <wl-skeleton-item
          variant="image"
          style="width: 200px; height: 200px;"
        />
        <div style="padding: 14px 0;">
          <wl-skeleton-item variant="h3" style="width: 50%;" />
          <div
            style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;"
          >
            <wl-skeleton-item variant="text" style="margin-right: 16px;" />
            <wl-skeleton-item variant="text" style="width: 30%;" />
          </div>
        </div>
      </template>
      <template>
        <wl-card :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img
            src="https://oatest.haierfhtech.com/hie-img/staticSourceServer/imgCdn/view_01.jpeg"
            class="image"
          />
          <div style="padding: 14px;">
            <span>美丽的风景</span>
            <div class="bottom card-header">
              <span class="time">{{ currentDate }}</span>
              <wl-button type="text" class="button">操作按钮</wl-button>
            </div>
          </div>
        </wl-card>
      </template>
    </wl-skeleton>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true,
        currentDate: '2023-06-01'
      }
    },
    methods: {
    }
  }
</script>
```

:::

### 渲染多条数据

大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。利用 `count` 这个属性就能控制渲染多少条假的数据在页面上

:::demo

```html
<template>
  <div style="width: 700px;">
    <p>
      <wl-button @click="setLoading">点我重新加载</wl-button>
    </p>
    <wl-skeleton  :loading="loading" animated :count="2" class="demo-test">
      <template slot="template">
        <div class="item">
          <wl-skeleton-item
            variant="image"
            style="width:340px; height: 267px;"
          />
          <div style="padding: 14px 0;">
            <wl-skeleton-item variant="h3" style="width: 50%;" />
            <div
              style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;"
            >
              <wl-skeleton-item variant="text" style="margin-right: 16px;" />
              <wl-skeleton-item variant="text" style="width: 30%;" />
            </div>
          </div>
        </div>
        
      </template>
      <template>
        <div style="display:flex; width:700px">
          <wl-card
            style="margin-right: 10px"
            :body-style="{ padding: '0px', marginBottom: '1px' }"
            v-for="item in lists"
            :key="item.name"
          >
            <img :src="item.imgUrl" class="image multi-content" />
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
              <div class="bottom card-header">
                <span class="time">{{ currentDate }}</span>
                <wl-button type="text" class="button">操作按钮</wl-button>
              </div>
            </div>
          </wl-card>
        </div>
      </template>
    </wl-skeleton>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: true,
        currentDate: '2021-06-01',
        lists: [],
      }
    },
    mounted() {
      this.loading = false
      this.lists = [
        {
          imgUrl:
            'https://oatest.haierfhtech.com/hie-img/staticSourceServer/imgCdn/view_01.jpeg',
          name: '美丽的风景1',
        },
        {
          imgUrl:
            'https://oatest.haierfhtech.com/hie-img/staticSourceServer/imgCdn/view_02.jpeg',
          name: '美丽的风景2',
        }
      ]
    },
    methods: {
      setLoading() {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>
```

:::

### 防止渲染抖动

可以通过 `throttle` 属性来避免数据请求返回过快导致的渲染闪屏问题。

:::demo

```html
<template>
  <div style="width: 240px">
    <p>
      <label style="margin-right: 16px;">切换 Loading</label>
      <wl-switch v-model="loading" />
    </p>
    <wl-skeleton
      style="width: 240px"
      :loading="loading"
      animated
      :throttle="500"
    >
      <template slot="template">
        <wl-skeleton-item
          variant="image"
          style="width: 240px; height: 240px;"
        />
        <div style="padding: 14px 0;">
          <wl-skeleton-item variant="h3" style="width: 50%;" />
          <div
            style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;"
          >
            <wl-skeleton-item variant="text" style="margin-right: 16px;" />
            <wl-skeleton-item variant="text" style="width: 30%;" />
          </div>
        </div>
      </template>
      <template>
        <wl-card :body-style="{ padding: '0px', marginBottom: '1px'}">
          <img
            src="https://oatest.haierfhtech.com/hie-img/staticSourceServer/imgCdn/view_03.jpeg"
            class="image"
            style="width: 240px; height: 240px;"
          />
          <div style="padding: 14px;">
            <span>美丽的风景3</span>
            <div class="bottom card-header">
              <span class="time">{{ currentDate }}</span>
              <wl-button type="text" class="button">操作按钮</wl-button>
            </div>
          </div>
        </wl-card>
      </template>
    </wl-skeleton>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        currentDate: '2021-06-01'
      }
    },
  }
</script>
```

:::

### Skeleton Attributes

| 参数     | 说明                                        | 类型    | 可选值       | 默认值 |
| -------- | ------------------------------------------- | ------- | ------------ | ------ |
| animated | 是否使用动画                                | boolean | true / false | false  |
| count    | 渲染多少个 template, 建议使用尽可能小的数字 | number  | integer      | 1      |
| loading  | 是否显示 skeleton 骨架屏                    | boolean | true / false | true |
| rows     | 骨架屏段落数量                              | number  | 正整数       | 4      |
| throttle | 延迟占位 DOM 渲染的时间, 单位是毫秒         | number  | 正整数       | 0      |

### Skeleton Item Attributes

| 参数    | 说明                     | 类型         | 可选值                                                               | 默认值 |
| ------- | ------------------------ | ------------ | -------------------------------------------------------------------- | ------ |
| variant | 当前显示的占位元素的样式 | Enum(string) | p / h1 / h3 / text / caption / button / image / circle / rect | text   |

### Skeleton Slots

| name     | description          |
| -------- | -------------------- |
| default  | 用来展示真实 UI     |
| template | 用来展示自定义占位符 |
