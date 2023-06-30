
<template>
  <div>
    <div class="banner">
      <div class="banner-container">
        <div class="title">万链共享设计库</div>
        <div class="description">适用于万链共享业务系统的设计体系</div>
        <div class="feature">自然 · 高效 · 开放</div>
      </div>
    </div>
    <div class="main-content">
      <wl-row>
        <wl-col :md="8" :sm="12" :xs="24" class="card-item--text">
            以用户更喜欢的方式<br>实现团队高效协同
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" class="card-item is-grey">
          <img src="~examples/assets/images/index/guide.png" class="icon" />
          <h4>设计指导</h4>
          <p>了解设计指南，帮助产品设计人员搭建逻辑清晰、结构合理且高效易用的产品。</p>
          <a class="btn-arrow" @click="jumpPage('/zh-CN/guide')"></a>
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" class="card-item">
          <img src="~examples/assets/images/index/components.png" class="icon" />
          <h4>组件</h4>
          <p>使用组件 Demo 快速体验交互细节；使用前端框架封装的代码帮助工程师快速开发。</p>
          <a class="btn-arrow" @click="jumpPage('/zh-CN/component')"></a>
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" class="card-item is-grey">
          <img src="~examples/assets/images/index/icons.png" class="icon" />
          <h4>图标库</h4>
          <p>图标支持自动更新，开发协作更高效。</p>
          <a class="btn-arrow" @click="jumpPage('/zh-CN/icon')"></a>
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" class="card-item">
          <img src="~examples/assets/images/index/resource.png" class="icon" />
          <h4>资源库</h4>
          <p>下载相关资源，用其快速搭建页面原型或高保真视觉稿，提升产品设计效率。</p>
          <a class="btn-arrow" @click="jumpPage('/zh-CN/resource')"></a>
        </wl-col>
      </wl-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    },
    created() {
    },
    methods: {
      jumpPage(path) {
        path && this.$router.push({
          path: path
        });
      }
    },
    mounted() {
    },
    destroyed() {
    }
  };
</script>
<style lang="scss" scoped>
  .banner {
    width: 100%;
    height: 310px;
    background: url('~examples/assets/images/index/banner.png') no-repeat center center;
    .banner-container {
      max-width: 1366px;
      margin: auto;
      padding: 63px 0 0 255px;
      box-sizing: border-box;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      line-height: 1.2;
      .title {
        margin-bottom: 25px;
        font-size: 34px;
        color: #1A7BF3;
      }
      .description {
        margin-bottom: 35px;
        font-size: 16px;
        color: rgba(0,0,0,0.65);
      }
      .feature {
        font-size: 20px;
        color: #000000;
      }
    }
  }
  .main-content {
    width: 900px;
    margin: auto;
    padding: 60px 0 46px;
  }
  .card-item ,.card-item--text {
    position: relative;
    height: 300px;
    margin-bottom: 2px;
    padding: 24px;
    box-sizing: border-box;
    cursor: pointer;
    .icon {
      display: block;
      width: 44px;
      height: 44px;
      margin-top: 5px;
    }
    h4 {
      font-weight: 400;
      font-size: 20px;
      color: #000000;
    }
    p {
      font-weight: 400;
      font-size: 14px;
      color: rgba(0,0,0,0.65);
      line-height: 22px;
    }
    .btn-arrow {
      position: absolute;
      right: 24px;
      bottom: 24px;
    }
  }
  .card-item:hover {
    .btn-arrow {
      background-image: url('~examples/assets/images/arrow_active.png');
    }
  }
  .is-grey {
    background: #F5F8FA;
    border-radius: 8px;
  }
  .card-item--text{
    padding-top: 92px;
    font-size: 24px;
    color: #000000;
  }
  
</style>