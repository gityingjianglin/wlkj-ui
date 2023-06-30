<template>
  <div id="app" :class="{ 'is-component': isComponent, 'is-design': isDesign }">
    <main-header></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <main-footer v-if="!isComponent && !isDesign"></main-footer>
  </div>
</template>

<script>
  import { use } from 'main/locale';
  import zhLocale from 'main/locale/lang/zh-CN';

  const lang = location.hash.replace('#', '').split('/')[1] || 'zh-CN';
  const localize = lang => {
    switch (lang) {
      case 'zh-CN':
        use(zhLocale);
        break;
      default:
        use(zhLocale);
    }
  };
  localize(lang);

  export default {
    name: 'app',

    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },
      isComponent() {
        return /^component-/.test(this.$route.name || '');
      },
      isDesign() {
        return /^design-/.test(this.$route.name || '');
      }
    },

    watch: {
    },

    methods: {
    },

    mounted() {
      localize(this.lang);
      console.log(this.isComponent);
    }
  };
</script>
