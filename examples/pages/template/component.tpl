<template>
  <wl-scrollbar class="page-component__scroll" ref="componentScrollBar">
    <div class="page-container page-component">
      <wl-scrollbar class="page-component__nav">
        <side-nav :data="navsData[lang]" :base="`/${ lang }/component`"></side-nav>
      </wl-scrollbar>
      <div class="page-component__content">
        <router-view class="content"></router-view>
      </div>
      <wl-backtop 
        v-if="showBackToTop"
        target=".page-component__scroll .wl-scrollbar__wrap"
        :right="100"
        :bottom="100"
      ></wl-backtop>
      <anchor-list :datas="anchorList"></anchor-list>
    </div>
  </wl-scrollbar>
</template>
<script>
  import bus from '../../bus';
  import navsData from '../../nav.config.json';
  import throttle from 'throttle-debounce/throttle';
  import AnchorList from '../../components/anchor-list.vue';
  export default {
    components: {
      AnchorList
    },
    data() {
      return {
        anchorList: [],
        lang: this.$route.meta.lang,
        navsData,
        scrollTop: 0,
        showHeader: true,
        componentScrollBar: null,
        componentScrollBoxElement: null
      };
    },
    watch: {
      '$route.path'() {
        // 触发伪滚动条更新
        this.componentScrollBox.scrollTop = 0;
        this.$nextTick(() => {
          this.componentScrollBar.update();
        });
      }
    },
    methods: {
      renderAnchorHref() {
        if (/changelog/g.test(location.href)) return;
        const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a');
        const basePath = location.href.split('#').splice(0, 2).join('#');
        let anchorList = [];
        [].slice.call(anchors).forEach(a => {
          const href = a.getAttribute('href');
          a.href = basePath + href;
          let temp = {};
          temp.href = a.href;
          temp.eleId = href.replace('#', '');
          let parent = a.parentNode;
          temp.text = parent.innerText.replace('¶\n', '');
          anchorList.push(temp);
          temp.active = false;
        });
        if (anchorList.length > 0) {
          anchorList[0]['active'] = true;
        }
        this.anchorList = anchorList;
      },

      goAnchor() {
        if (location.href.match(/#/g).length > 1) {
          const anchor = location.href.match(/#[^#]+$/g);
          if (!anchor) return;
          const elm = document.querySelector(anchor[0]);
          if (!elm) return;

          setTimeout(_ => {
            this.componentScrollBox.scrollTop = elm.offsetTop;
          }, 50);
        }
      },
      isElementVisible(element) {
        if (element) {
          let rect = element.getBoundingClientRect();
          let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
          return (rect.top >= 0 && rect.top <= viewHeight && rect.bottom >= 0);
        }
      },
      handleScroll() {
        const scrollTop = this.componentScrollBox.scrollTop;
        if (this.showHeader !== this.scrollTop > scrollTop) {
          this.showHeader = this.scrollTop > scrollTop;
        }
        if (scrollTop === 0) {
          this.showHeader = true;
        }
        if (!this.navFaded) {
          bus.$emit('fadeNav');
        }
        this.scrollTop = scrollTop;

        // 处理锚点激活状态，如果是通过点击锚点定位，则不通过滚动方式控制锚点激活状态
        let anchorClick = localStorage.getItem('anchorClick');
        if (anchorClick === 'T') {
          localStorage.setItem('anchorClick', 'F');
        } else {
          let activeIdx = '';
          for (let i = 0; i < this.anchorList.length; i++) {
            let item = this.anchorList[i];
            let element = document.getElementById(item.eleId);
            if (this.isElementVisible(element)) {
              activeIdx = i;
              break;
            }
          }
          if (activeIdx !== '') {
            this.anchorList.forEach((item) => {
              item.active = false;
            });
            this.anchorList[activeIdx]['active'] = true;
          }
        }
      }
    },
    computed: {
      showBackToTop() {
        return !this.$route.path.match(/backtop/);
      }
    },
    created() {
      bus.$on('navFade', val => {
        this.navFaded = val;
      });
    },
    mounted() {
      this.componentScrollBar = this.$refs.componentScrollBar;
      this.componentScrollBox = this.componentScrollBar.$el.querySelector('.wl-scrollbar__wrap');
      this.throttledScrollHandler = throttle(300, this.handleScroll);
      this.componentScrollBox.addEventListener('scroll', this.throttledScrollHandler);
      this.renderAnchorHref();
      this.goAnchor();
      document.body.classList.add('is-component');
    },
    destroyed() {
      document.body.classList.remove('is-component');
    },
    beforeDestroy() {
      this.componentScrollBox.removeEventListener('scroll', this.throttledScrollHandler);
    },
    beforeRouteUpdate(to, from, next) {
      next();
      setTimeout(() => {
        const toPath = to.path;
        const fromPath = from.path;
        if (toPath === fromPath && to.hash) {
          this.goAnchor();
        }
        if (toPath !== fromPath) {
          document.documentElement.scrollTop = document.body.scrollTop = 0;
          this.renderAnchorHref();
        }
      }, 100);
    }
  };
</script>
<style lang="scss">
  .page-component__scroll {
    height: calc(100% - 64px);
    margin-top: 64px;

    > .wl-scrollbar__wrap {
      overflow-x: auto;
    }
  }

  .page-component {
    box-sizing: border-box;
    height: 100%;
  
    &.page-container {
      padding: 0;
    }

    .page-component__nav {
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
      padding-top: 50px;
      padding-bottom: 50px;
      padding-right: 0;
      padding-left: 30px;
      & > ul {
        padding-bottom: 50px;
      }
    }

    .page-component__content {
      padding-left: 270px;
      padding-bottom: 100px;
      box-sizing: border-box;
    }

    .content {
      padding-top: 50px;
      padding-right: 200px;
      > {
        h3 {
          margin: 55px 0 20px;
        }

        table {
          border-collapse: collapse;
          border: 1px solid #ddd;
          width: 100%;
          background-color: #fff;
          font-size: 14px;
          margin-bottom: 45px;
          line-height: 1.5em;

          strong {
            font-weight: normal;
          }

          td, th {
            border-bottom: 1px solid #ddd;
            padding: 15px;
            max-width: 250px;
          }

          th {
            text-align: left;
            white-space: nowrap;
            color: #333;
            font-weight: bold;
            background: #fbfbfb;
          }

          td {
            color: #606266;
          }

          th:first-child, td:first-child {
            padding-left: 15px;
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
    .page-component {
      .page-component__nav {
        width: 100%;
        position: static;
        margin-top: 0;
      }
      .side-nav {
        padding-top: 0;
        padding-left: 50px;
      }
      .page-component__content {
        padding-left: 10px;
        padding-right: 10px;
      }
      .content {
        padding-top: 0;
      }
      .content > table {
        overflow: auto;
        display: block;
      }
    }
  }
</style>
