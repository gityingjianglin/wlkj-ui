<template>
  <div class="page-container page-guide">
    <div class="page-banner banner-guide">
      <div class="wrapper">
        <h2>设计指导</h2>
      </div>
    </div>
    <div class="wrapper wrapper-content">
      <wl-row :gutter="50">
        <wl-col :md="8" :sm="12" :xs="24" >
          <div class="card-item">
            <div class="card-type">
              万链企业级应用<br>UI设计规范
            </div>
            <p class="card-title">万链企业级应用UI设计规范—web端</p>
            <div class="card-foot">
              <span>
                版本号：V1.1
              </span>
              <a class="icon icon-arrow" @click="jumpPage('/zh-CN/design-web/color')"></a>
            </div>
          </div>
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" >
          <div class="card-item"></div>
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" >
          <div class="card-item"></div>
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" >
          <div class="card-item"></div>
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" >
          <div class="card-item"></div>
        </wl-col>
        <wl-col :md="8" :sm="12" :xs="24" >
          <div class="card-item"></div>
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
    methods: {
      jumpPage(path) {
        path && this.$router.push({
          path: path
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .banner-guide {
    background-image: url('~examples/assets/images/guide/banner.png');
  }
</style>