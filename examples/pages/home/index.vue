
<template>
  <div>
    <div class="background">
      <img src="../../assets/images/background.png" class="background-image">
      <div class="theme">
        <div class="theme-title">万链共享设计库</div>
        <div class="theme-subtitle">适用于万链共享业务系统的设计体系</div>
        <div class="theme-keywords">自然 · 高效 · 开放</div>
      </div>
    </div>
    <div class="content-box">
      <div v-for="(item,index) in pageList" :key="index" class="page-item">
        <img v-if="item.img" :src="item.img" class="page-item-img">
        <div :class="item.mode === 'page' ? 'page-item-title' : 'content-title'">{{item.title}}</div>
        <div class="page-item-content">{{item.content}}</div>
        <div v-if="item.mode === 'page'" @mouseenter="item.active = true" @mouseleave="item.active = false" class="page-item-button" @click="jumpPage(item.path)">
          <img v-if="item.active" src="../../assets/images/arrow_active.png">
          <img v-else src="../../assets/images/arrow_static.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pageList: [
          {
            mode: 'head',
            img: null,
            title: '以用户更喜欢的方式实现团队高效协同',
            content: null,
            active: false
          },
          {
            mode: 'page',
            img: require('../../assets/images/guide.png'),
            path: '/home',
            title: '设计指导',
            content: '了解设计指南，帮助产品设计人员搭建逻辑清晰、结构合理且高效易用的产品。',
            active: false
          },
          {
            mode: 'page',
            img: require('../../assets/images/components.png'),
            path: '/zh-CN/component',
            title: '组件',
            content: '使用组件 Demo 快速体验交互细节；使用前端框架封装的代码帮助工程师快速开发。',
            active: false
          },
          {
            mode: 'page',
            img: require('../../assets/images/icons.png'),
            title: '图标库',
            content: '图标支持自动更新，开发协作更高效。',
            active: false
          },
          {
            mode: 'page',
            img: require('../../assets/images/resource.png'),
            title: '资源库',
            content: '下载相关资源，用其快速搭建页面原型或高保真视觉稿，提升产品设计效率。',
            active: false
          }
        ]
      };
    },
    created() {
    },
    methods: {
      sizeInit() {
        let tpl = document.documentElement;
        let baseSize = (tpl.clientWidth / 1920) * 100;
        tpl.style.fontSize = baseSize + 'px';
      },
      removeSize() {
        let html = document.documentElement;
        html.style.fontSize = '';
      },
      jumpPage(path) {
        path && this.$router.push({
          path: path
        });
      }

    },
    mounted() {
      this.sizeInit();
      window.addEventListener('resize', this.sizeInit);
    },
    destroyed() {
      window.removeEventListener('resize', this.sizeInit);
      this.removeSize();
    }
  };
</script>
<style lang="scss" scoped>
.background { 
  width: 100%;
  height: 3.07rem;
  position: relative;
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: -0.64rem;
    width: 19.2rem;
    height: 3.71rem;
  }
  .theme {
    margin-top: 0.57rem;
    margin-left: 6.15rem;
    .theme-title {
      line-height: 0.42rem;
      font-size: 0.34rem;
      font-weight: bold;
      color: #1A7BF3;
    }
    .theme-subtitle {
      margin-top: 0.24rem;
      font-size: 0.16rem;
      line-height: 0.16rem;
      color: rgba(0,0,0,0.65);
    }
    .theme-keywords {
      margin-top: 0.36rem;
      line-height: 0.3rem;
      font-size: 0.2rem;
      color: #000000;
    }
  }
}
.content-box {
  display: grid;
  grid-template-columns: 3rem 3rem 3rem;
  width: 9rem;
  margin: 0.63rem auto 0.46rem;
  .page-item:nth-child(even) {
    background-color: #F5F8FA;
  }
  .page-item {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 3rem;
    padding: 0.29rem 0.24rem 0.23rem;
    .page-item-img {
      width: 0.44rem;
      height: 0.44rem;
    }
    .content-title {
      margin-top: 0.66rem;
      line-height: 0.33rem;
      font-size: 0.24rem;
      color: #000000;
    }
    .page-item-title {
      margin: 0.22rem 0 0.32rem;
      font-size: 0.2rem;
      color: #000000;
      line-height: 0.28rem;
    }
    .page-item-content {
      font-size: 0.14rem;
      color: rgba(0,0,0,0.65);
    }
    .page-item-button {
      position: absolute;
      bottom: 0.23rem;
      right: 0.24rem;
      width: 0.46rem;
      height: 0.32rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .page-item-button:hover {
      cursor: pointer;
    }
  }
}
</style>