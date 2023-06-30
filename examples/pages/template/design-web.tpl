<template>
  <!-- <div class="page-container page-guide">
    <wl-row>
      <wl-col :xs="24" :sm="3">
        <side-nav :data="navsData" :base="`/${ lang }/design-web`"></side-nav>
      </wl-col>
      <wl-col :xs="24" :sm="21">
        <router-view class="content"></router-view>
      </wl-col>
    </wl-row>
  </div> -->
  <wl-scrollbar class="page-common_scroll" ref="commonScrollBar">
    <div class="page-container page-common page-guide">
      <wl-scrollbar class="page-common__nav">
        <side-nav :data="navsData" :base="`/${ lang }/design-web`"></side-nav>
      </wl-scrollbar>
      <div class="page-common__content">
        <router-view class="content"></router-view>
      </div>
    </div>
  </wl-scrollbar>
</template>
<script>
  export default {
    data() {
      return {
        lang: this.$route.meta.lang,
        navsData: [
          {
            name: '原子元素',
            children: [
              {
                path: '/color',
                name: '色彩'
              },
              {
                path: '/font',
                name: '字体'
              },
              {
                path: '/net-grid',
                name: '网格'
              },
              {
                path: '/radius',
                name: '圆角'
              },
              {
                path: '/shadow',
                name: '投影'
              },
              {
                path: '/icon',
                name: '图标'
              },
              {
                path: '/grid',
                name: '栅格'
              },
              {
                path: '/zindex',
                name: '层级'
              }
            ]
          },
          {
            name: '通用组件',
            children: [
              {
                path: '/button',
                name: '按钮'
              },
              {
                path: '/input',
                name: '输入框'
              },
              {
                path: '/select',
                name: '选择器'
              },
              {
                path: '/form',
                name: '表单'
              },
              {
                path: '/nav',
                name: '导航菜单'
              },
              {
                path: '/table',
                name: '表格'
              }
            ]
          },
          {
            name: '结构布局',
            children: [
              {
                path: '/layout',
                name: '结构类'
              },
              {
                path: '/layout-frontend',
                name: '前台布局'
              },
              {
                path: '/layout-backend',
                name: '后台布局'
              }
            ]
          }
        ],
        commonScrollBar: null,
        commonScrollBox: null
      };
    },
    watch: {
      '$route.path'() {
        // 触发伪滚动条更新
        this.commonScrollBox.scrollTop = 0;
        this.$nextTick(() => {
          this.commonScrollBar.update();
        });
      }
    },
    mounted() {
      this.commonScrollBar = this.$refs.commonScrollBar;
      this.commonScrollBox = this.commonScrollBar.$el.querySelector('.wl-scrollbar__wrap');
    }
  };
</script>
<style lang="scss">
  .page-guide {
    background: #ffffff;
  }
  .page-common_scroll {
    height: calc(100% - 64px);
    margin-top: 64px;
    > .wl-scrollbar__wrap {
      overflow-x: auto;
    }
  }
  .page-common {
    box-sizing: border-box;
    height: 100%;
  
    &.page-container {
      padding: 0;
    }

    .page-common__nav {
      width: 240px;
      position: fixed;
      top: 0;
      bottom: 0;
      margin-top: 64px;
      transition: padding-top .3s;

      > .wl-scrollbar__wrap {
        height: 100%;
        overflow-x: auto;
      }

      &.is-extended {
        padding-top: 0;
      }
    }

    .side-nav {
      height: 100%;
      padding-top: 25px;
      padding-bottom: 25px;
      padding-right: 0;
      padding-left: 30px;
      & > ul {
        padding-bottom: 50px;
      }
    }

    .page-common__content {
      padding-left: 270px;
      padding-bottom: 100px;
      box-sizing: border-box;
    }

    .content {
      padding-top: 50px;
      padding-right: 50px;
      > {
        h3 {
          margin: 55px 0 20px;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          background-color: #fff;
          font-size: 14px;
          margin-bottom: 45px;
          line-height: 1.5em;

          strong {
            font-weight: normal;
          }

          td, th {
            border-bottom: 1px solid #dcdfe6;
            padding: 15px;
            max-width: 250px;
          }

          th {
            text-align: left;
            white-space: nowrap;
            color: #909399;
            font-weight: normal;
          }

          td {
            color: #606266;
          }

          th:first-child, td:first-child {
            padding-left: 10px;
          }
        }

        ul:not(.timeline) {
          margin: 10px 0;
          padding: 0 0 0 20px;
          font-size: 14px;
          color: #5e6d82;
          line-height: 2em;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .page-common {
      .page-common__nav {
        width: 100%;
        position: static;
        margin-top: 0;
      }
      .side-nav {
        padding-top: 0;
        padding-left: 50px;
      }
      .page-common__content {
        padding-left: 10px;
        padding-right: 10px;
      }
      .content {
        padding-top: 0;
        padding-right: 0;
      }
      .content > table {
        overflow: auto;
        display: block;
      }
    }
  }
</style>
