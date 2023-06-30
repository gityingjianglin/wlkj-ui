import { getStyle } from '../../../src/utils/dom';
import { createVue, destroyVM } from '../util';
import Vue from 'vue';
import LoadingRaw from 'packages/loading';
const Loading = LoadingRaw.service;
describe('Loading', () => {
  let vm, loadingInstance1, loadingInstance2;
  afterEach(()=> {
    destroyVM(vm);
    if (loadingInstance1) {
      loadingInstance1.close();
      loadingInstance1.$el &&
      loadingInstance1.$el.parentNode &&
      loadingInstance1.$el.parentNode.removeChild(loadingInstance1.$el);
    }
    if (loadingInstance2) {
      loadingInstance2.close();
      loadingInstance2.$el &&
      loadingInstance2.$el.parentNode &&
      loadingInstance2.$el.parentNode.removeChild(loadingInstance2.$el);
    }
  });

  describe('as a directive', () => {
    it('create', done => {
      vm = createVue({
        template: `
          <div v-loading="loading"></div>
        `,
        data() {
          return {
            loading: true
          };
        }
      }, true);
      Vue.nextTick(() => {
        let mask = vm.$el.querySelector('.wl-loading-mask');
        expect(mask).to.exist;
        vm.loading = false;
        setTimeout(() => {
          expect(mask.style.display).to.equal('none');
          done();
        }, 100);
      });
    });

    it('unbind', done => {
      const vm1 = createVue({
        template: `
          <div v-if="show" v-loading.body="loading"></div>
        `,
        data() {
          return {
            show: true,
            loading: true
          };
        }
      }, true);

      const vm2 = createVue({
        template: `
          <div v-if="show" v-loading="loading"></div>
        `,
        data() {
          return {
            show: true,
            loading: true
          };
        }
      }, true);
      Vue.nextTick(() => {
        vm1.loading = false;
        vm2.loading = false;
        Vue.nextTick(() => {
          vm1.show = false;
          vm2.show = false;
          Vue.nextTick(() => {
            expect(document.querySelector('.wl-loading-mask')).to.not.exist;
            done();
          });
        });
      });
    });

    it('body', done => {
      vm = createVue({
        template: `
          <div v-loading.body="loading"></div>
        `,
        data() {
          return {
            loading: true
          };
        }
      }, true);
      Vue.nextTick(() => {
        let mask = document.querySelector('.wl-loading-mask');
        expect(mask.parentNode === document.body).to.be.true;
        vm.loading = false;
        document.body.removeChild(mask);
        document.body.removeChild(vm.$el);
        done();
      });
    });

    it('fullscreen', done => {
      vm = createVue({
        template: `
          <div v-loading.fullscreen="loading"></div>
        `,
        data() {
          return {
            loading: true
          };
        }
      }, true);
      Vue.nextTick(() => {
        let mask = document.querySelector('.wl-loading-mask');
        expect(mask.parentNode === document.body).to.be.true;
        expect(mask.classList.contains('is-fullscreen')).to.be.true;
        vm.loading = false;
        document.body.removeChild(mask);
        document.body.removeChild(vm.$el);
        done();
      });
    });

    it('lock', done => {
      vm = createVue({
        template: `
          <div v-loading.fullscreen.lock="loading"></div>
        `,
        data() {
          return {
            loading: true
          };
        }
      }, true);
      Vue.nextTick(() => {
        let mask = document.querySelector('.wl-loading-mask');
        expect(getStyle(document.body, 'overflow')).to.be.equal('hidden');
        vm.loading = false;
        document.body.removeChild(mask);
        document.body.removeChild(vm.$el);
        done();
      });
    });

    it('text', done => {
      vm = createVue({
        template: `
          <div v-loading="loading" wlkj-loading-text="玩命加载中..."></div>
        `,
        data() {
          return {
            loading: true
          };
        }
      }, true);
      Vue.nextTick(() => {
        let mask = document.querySelector('.wl-loading-mask');
        let text = mask.querySelector('.wl-loading-text');
        expect(text).to.be.exist;
        expect(text.textContent.trim()).to.be.equal('玩命加载中...');
        done();
      });
    });

    it('customClass', done => {
      vm = createVue({
        template: `
          <div v-loading="loading" wlkj-loading-custom-class="my-custom-class"></div>
        `,
        data() {
          return {
            loading: true
          };
        }
      }, true);
      Vue.nextTick(() => {
        let mask = document.querySelector('.wl-loading-mask');
        expect(mask.classList.contains('my-custom-class')).to.be.true;
        done();
      });
    });
  });

  describe('as a service', () => {
    it('create', () => {
      loadingInstance1 = Loading();
      expect(document.body.querySelector('.wl-loading-mask')).to.be.exist;
    });

    it('close', () => {
      loadingInstance1 = Loading();
      loadingInstance1.close();
      expect(loadingInstance1.visible).to.be.false;
    });

    it('target', done => {
      vm = createVue({
        template: `
          <div class="loading-container"></div>
        `
      }, true);
      const container = document.querySelector('.loading-container');
      loadingInstance1 = Loading({
        target: '.loading-container'
      });
      const mask = document.querySelector('.wl-loading-mask');
      expect(mask).to.exist;
      expect(mask.parentNode).to.equal(container);
      loadingInstance1.close();
      setTimeout(() => {
        expect(getStyle(container, 'position')).to.equal('relative');
        done();
      }, 200);
    });

    it('body', () => {
      vm = createVue({
        template: `
          <div class="loading-container"></div>
        `
      }, true);
      loadingInstance1 = Loading({
        target: '.loading-container',
        body: true
      });
      const mask = document.querySelector('.wl-loading-mask');
      expect(mask).to.exist;
      expect(mask.parentNode).to.equal(document.body);
    });

    it('fullscreen', () => {
      loadingInstance1 = Loading({
        fullscreen: true
      });
      const mask = document.querySelector('.wl-loading-mask');
      expect(mask).to.exist;
      expect(mask.parentNode).to.equal(document.body);
      expect(mask.classList.contains('is-fullscreen')).to.true;
    });

    it('fullscreen singleton', (done) => {
      loadingInstance1 = Loading({
        fullscreen: true
      });
      setTimeout(() => {
        loadingInstance2 = Loading({ fullscreen: true });
        setTimeout(() => {
          let masks = document.querySelectorAll('.wl-loading-mask');
          expect(masks.length).to.equal(1);
          loadingInstance2.close();
          setTimeout(() => {
            masks = document.querySelectorAll('.wl-loading-mask');
            expect(masks.length).to.equal(0);
            done();
          }, 350);
        }, 50);
      }, 50);
    });

    it('lock', () => {
      loadingInstance1 = Loading({
        lock: true
      });
      expect(getStyle(document.body, 'overflow')).to.equal('hidden');
    });

    it('text', () => {
      loadingInstance1 = Loading({
        text: '玩命加载中'
      });
      const mask = document.querySelector('.wl-loading-mask');
      const text = mask.querySelector('.wl-loading-text');
      expect(text.textContent.trim()).to.equal('玩命加载中');
    });

    it('customClass', () => {
      loadingInstance1 = Loading({
        customClass: 'my-loading-class'
      });
      const mask = document.querySelector('.wl-loading-mask');
      expect(mask.classList.contains('my-loading-class')).to.true;
    });

  });
});
