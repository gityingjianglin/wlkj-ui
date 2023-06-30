## Drawer 抽屉

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

### 基本用法

呼出一个临时的侧边栏, 可以从多个方向呼出

:::demo 需要设置 `visible` 属性，它的**类型**是 `boolean`,当为 **true** 时显示 Drawer。Drawer 分为两个部分：`title` 和 `body`，`title` 需要具名为 **title** 的 `slot`, 也可以通过 `title` 属性来定义，默认值为空。需要注意的是, Drawer 默认是从右往左打开, 当然可以设置对应的 `direction`, 详细请参考 `direction` 用法 最后，本例还展示了 `before-close` 的用法

```html
<wl-radio-group v-model="direction">
  <wl-radio label="ltr">left</wl-radio>
  <wl-radio label="rtl">right</wl-radio>
  <wl-radio label="ttb">top</wl-radio>
  <wl-radio label="btt">bottom</wl-radio>
</wl-radio-group>
<div>
  <wl-button @click="drawer = true" type="primary" style="margin-top: 16px;">
    open
  </wl-button>
</div>


<wl-drawer
  title="标题"
  :visible.sync="drawer"
  :direction="direction"
  :before-close="handleClose">
  <span>内容区域</span>
</wl-drawer>

<script>
  export default {
    data() {
      return {
        drawer: false,
        direction: 'rtl',
      };
    },
    methods: {
      handleClose(done) {
        done();
      }
    }
  };
</script>
```
:::

### 自定义窗体大小

可通过设置`size`属性控制窗体的大小

:::demo 当使用 `number` 类型时, 以像素为单位, 当使用 `string` 类型时, 请传入 'x%'。

```html
<wl-button @click="drawer1 = true" type="primary" >
  固定尺寸
</wl-button>
<wl-button @click="drawer2 = true" type="primary" >
  百分比尺寸
</wl-button>

<wl-drawer
  title="标题"
  :size='600'
  :visible.sync="drawer1">
  <span>内容区域</span>
</wl-drawer>
<wl-drawer
  title="标题"
  size="25%"
  :visible.sync="drawer2">
  <span>内容区域</span>
</wl-drawer>

<script>
  export default {
    data() {
      return {
        drawer1: false,
        drawer2: false
      };
    }
  };
</script>
```
:::

### 不添加 Title

当你不需要标题到时候, 你还可以去掉标题

:::demo 当遇到不需要 title 的场景时, 可以通过 `withHeader` 这个属性来关闭掉 title 的显示, 这样可以留出更大的空间给到用户, 为了用户的可访问性, 请务必设定 `title` 的值

```html
<wl-button @click="drawer = true" type="primary" >
  open
</wl-button>

<wl-drawer
  title="我是标题"
  :visible.sync="drawer"
  :with-header="false">
  <span>内容区域</span>
</wl-drawer>

<script>
  export default {
    data() {
      return {
        drawer: false,
      };
    }
  };
</script>
```
:::


### 自定义内容

`Drawer` 内部可以嵌套各种丰富的操作

:::demo

```html
<wl-button type="text" @click="dialog = true">嵌套Form表单的Drawer</wl-button>

<wl-drawer
  title="嵌套Form表单的Drawer"
  :before-close="handleClose"
  :visible.sync="dialog"
  direction="ltr"
  custom-class="demo-drawer"
  ref="drawer"
  >
  <div class="demo-drawer__content">
    <wl-form :model="form" label-position="left" :label-width="formLabelWidth">
      <wl-form-item label="活动名称" >
        <wl-input v-model="form.name" autocomplete="off"></wl-input>
      </wl-form-item>
      <wl-form-item label="活动区域">
        <wl-select v-model="form.region" placeholder="请选择活动区域">
          <wl-option label="区域一" value="shanghai"></wl-option>
          <wl-option label="区域二" value="beijing"></wl-option>
        </wl-select>
      </wl-form-item>
    </wl-form>
    <div class="demo-drawer__footer">
      <wl-button @click="cancelForm">取 消</wl-button>
      <wl-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</wl-button>
    </div>
  </div>
</wl-drawer>

<script>
export default {
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      form: {
        name: '',
        region: '',
      },
      formLabelWidth: '80px',
      timer: null,
    };
  },
  methods: {
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }
}
</script>
```
:::

### Drawer Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| append-to-body     | Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true   | boolean   | — | false |
| before-close | 关闭前的回调，会暂停 Drawer 的关闭 | function(done)，done 用于关闭 Drawer | — | — |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer | boolean    | — | true |
| custom-class      | Drawer 的自定义类名 | string    | — | — |
| destroy-on-close | 控制是否在关闭 Drawer 之后将子元素全部销毁 | boolean | - | false |
| modal     | 是否需要遮罩层   | boolean   | — | true |
| modal-append-to-body     | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Drawer 的父元素上   | boolean   | — | true |
| direction | Drawer 打开的方向 | Direction | rtl / ltr / ttb / btt | rtl |
| show-close | 是否显示关闭按钮 | boolean    | — | true |
| size | Drawer 窗体的大小, 当使用 `number` 类型时, 以像素为单位, 当使用 `string` 类型时, 请传入 'x%', 否则便会以 `number` 类型解释 | number / string | - | '30%' |
| title     | Drawer 的标题，也可通过具名 slot （见下表）传入 | string    | — | — |
| visible   | 是否显示 Drawer，支持 .sync 修饰符 | boolean | — | false |
| wrapperClosable | 点击遮罩层是否可以关闭 Drawer | boolean | - | true |
| withHeader | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效 | boolean | - | true |

### Drawer Slot

| name | 说明 |
|------|--------|
| — | Drawer 的内容 |
| title | Drawer 标题区的内容 |

### Drawer Methods

| name | 说明 |
| ---- | ---  |
| closeDrawer | 用于关闭 Drawer, 该方法会调用传入的 `before-close` 方法 |

### Drawer Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| open  | Drawer 打开的回调 | — |
| opened  | Drawer 打开动画结束时的回调 | — |
| close  | Drawer 关闭的回调 | — |
| closed | Drawer 关闭动画结束时的回调 | — |
