<template>
  <div class="page-container page-resource">
    <div class="page-banner banner-resource">
      <div class="wrapper">
        <h2>资源库</h2>
      </div>
    </div>
    <div class="wrapper wrapper-content">
      <wl-row :gutter="50">
        <wl-col :md="8" :sm="12" :xs="24" >
          <div class="card-item card-module-1">
            <div class="card-type">
              <img src="~examples/assets/images/resource/icon_sketch.png" class="img" />
            </div>
            <p class="card-title">Web Sketch组件包</p>
            <div class="card-foot">
              <span>
                版本号：V1.1
              </span>
              <a class="icon icon-download" href="http://www.baidu.com"></a>
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
  .banner-resource {
    background-image: url('~examples/assets/images/resource/banner.png');
  }
</style>