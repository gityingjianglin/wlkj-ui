<template>
  <footer class="footer">
    <div>万链共享设计</div>
  </footer>
</template>

<style lang="scss">
  .footer {
    background-color: #F7FBFD;
    width: 100%;
    padding: 20px 150px;
    box-sizing: border-box;
    height: 100px;
    text-align: center;

    .container {
      box-sizing: border-box;
      width: auto;
    }

    .footer-main {
      font-size: 0;
      display: inline-block;
      vertical-align: top;
      margin-right: 110px;

      h4 {
        font-size: 18px;
        color: #333;
        line-height: 1;
        margin: 0 0 15px 0;
      }

      .footer-main-link {
        display: block;
        margin: 0;
        line-height: 2;
        font-size: 14px;
        color: #666;

        &:hover {
          color: #333;
        }
      }
    }
  }
</style>

<script type="text/babel">
  import compoLang from '../i18n/component.json';

  export default {
    data() {
      return {
      };
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },

      langConfig() {
        return compoLang.filter(config => config.lang === this.lang)[0]['footer'];
      }
    }
  };
</script>
