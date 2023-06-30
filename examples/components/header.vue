<template>
  <div class="header-wrapper">
    <header class="header" ref="header">
      <div class="container">
        <h1><router-link :to="'/home'">
          <!-- logo -->
          <slot>
            <img
              src="../assets/images/logo.png"
              alt="element-logo"
              class="nav-logo">
          </slot>
        </router-link></h1>

        <!-- nav -->
        <ul class="nav">
          <li class="nav-item">
            <router-link
              :class="{'active': designGuideActive}"
              active-class="active"
              :to="`/${ lang }/guide`">{{ langConfig.guide }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/${ lang }/component`">{{ langConfig.components }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/${ lang }/resource`">{{ langConfig.resource }}
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/${ lang }/test`">{{ langConfig.test }}
            </router-link>
          </li> -->
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
  import compoLang from '../i18n/component.json';
  export default {
    data() {
      return {
        active: '',
        designGuideActive: false
      };
    },
    components: {
    },
    computed: {
      lang() {
        let res = this.$route.path.split('/')[1] || 'zh-CN';
        return res;
      },
      displayedLang() {
        return this.langs[this.lang] || '中文';
      },
      langConfig() {
        let res = compoLang.filter(config => config.lang === this.lang)[0]['header'];
        return res;
      }
    },
    watch: {
      $route(to) {
        console.log('to', to);
        if (to.name && to.name.indexOf('design-web') > -1 || to.name.indexOf('guide') > -1) {
          this.designGuideActive = true;
        } else {
          this.designGuideActive = false;
        }
      }
    },
    mounted() {
    },
    methods: {
    },
    created() {
    }
  };
</script>
<style lang="scss" scoped>
  .header-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 64px;
    z-index: 1500;
  }

  .header {
    height: 64px;
    background-color: #fff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 63px;
    z-index: 100;
    position: relative;

    .container {
      height: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #DCDCDC;
    }

    .nav-lang-spe {
      color: #888;
    }

    h1 {
      margin: 0;
      float: left;
      font-size: 32px;
      font-weight: normal;

      a {
        color: #333;
        text-decoration: none;
        display: block;
        vertical-align: middle;
      }

      span {
        font-size: 12px;
        display: inline-block;
        width: 34px;
        height: 18px;
        border: 1px solid rgba(255, 255, 255, .5);
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
        margin-left: 10px;
        border-radius: 3px;
      }
    }

    .nav {
      float: right;
      height: 100%;
      line-height: 63px;
      background: transparent;
      padding: 0;
      margin: 0;
      &::before, &::after {
        display: table;
        content: "";
      }
      &::after {
        clear: both;
      }
    }

    
    .nav-logo,
    .nav-item {
      width: 140px;
      margin: 0;
      float: left;
      list-style: none;
      position: relative;
      cursor: pointer;
    
      &.nav-algolia-search {
        cursor: default;
      }
    
      &.lang-item,
      /* &:last-child {
        cursor: default;
        margin-left: 34px;

        span {
          opacity: .8;
        }

        .nav-lang {
          cursor: pointer;
          display: inline-block;
          height: 100%;
          color: #888;

          &:hover {
            color: #409EFF;
          }
          &.active {
             font-weight: bold;
             color: #1A7BF3;
           }
        }
      } */

      a {
        width: 64px;
        margin: 0 auto;
        text-decoration: none;
        color: #000000;
        display: flex;
        justify-content: center;
        padding: 0 22px;
        font-size: 16px;

        &.active,
        &:hover {
          color: #1A7BF3;
          font-weight: bold;
        }

        &.active::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 0;
          width: 64px;
          height: 2px;
          background: #1A7BF3;
        }
      }
    }
    .nav-logo {
      width: auto;
      margin: 17px 24px;
      vertical-align: middle;
    }
  }
</style>
