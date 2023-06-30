<template>
  <div class="wl-breadcrumb__item">
    <span class="wl-breadcrumb__inner" :class="{'is-link': to}" @click="gotoDetail"><slot></slot></span>
    <span role="presentation" class="wl-breadcrumb__separator" v-if="separator">{{separator}}</span>
    <i :class="separatorClass" class="wl-breadcrumb__separator" v-if="separatorClass"></i>
  </div>
</template>

<script>
  export default {
    name: 'WlBreadcrumbItem',
    props: {
      to: {
        type: [Object, String]
      },
      replace: {
        type: Boolean
      },
      target: {
        type: String
      }
    },
    data() {
      return {
        separator: '',
        separatorClass: ''
      };
    },
    methods: {
      gotoDetail() {
        if (this.to) {
          if (typeof this.to === 'string') {
            if (this.target) {
              switch (this.target) {
                case 'blank':
                  window.open(this.to);
                  break;
                default:
                  window.location.href = this.to;
              }
            } else {
              window.location.href = this.to;
            }
          } else {
            if (this.to.path) {
              if (this.replace) {
                this.$router.replace({
                  path: this.to.path
                });
              } else {
                this.$router.push({
                  path: this.to.path
                });
              }
            }
          }
        }
      }
    },
    mounted() {
      console.log('1111111111111111111111111111111111111');
      // console.log(this.$parent.separator);
      console.log(this.breadcrumb);
      this.separator = this.breadcrumb.separator;
      this.separatorClass = this.breadcrumb.separatorClass;
    },
    inject: ['breadcrumb']
  };
</script>
