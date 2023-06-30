import { createVue, destroyVM } from '../util';

describe('Carousel', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createVue({
      template: `
        <div>
          <wl-carousel ref="carousel">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
    });
    expect(vm.$refs.carousel.direction).to.be.equal('horizontal');
    expect(vm.$el.querySelectorAll('.wl-carousel__item').length).to.equal(3);
  });

  it('auto play', done => {
    vm = createVue({
      template: `
        <div>
          <wl-carousel :interval="50">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
    });

    setTimeout(() => {
      const items = vm.$el.querySelectorAll('.wl-carousel__item');
      expect(items[0].classList.contains('is-active')).to.true;
      setTimeout(() => {
        expect(items[1].classList.contains('is-active')).to.true;
        done();
      }, 60);
    }, 10);
  });

  it('initial index', done => {
    vm = createVue({
      template: `
        <div>
          <wl-carousel :autoplay="false" :initial-index="1">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
    });

    setTimeout(() => {
      expect(vm.$el.querySelectorAll('.wl-carousel__item')[1].classList.contains('is-active')).to.true;
      done();
    }, 10);
  });

  it('reset timer', done => {
    vm = createVue({
      template: `
        <div>
          <wl-carousel :interval="20">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
    });

    setTimeout(() => {
      const carousel = vm.$children[0];
      const items = vm.$el.querySelectorAll('.wl-carousel__item');
      carousel.handleMouseEnter();
      setTimeout(() => {
        expect(items[0].classList.contains('is-active')).to.true;
        carousel.handleMouseLeave();
        setTimeout(() => {
          expect(items[1].classList.contains('is-active')).to.true;
          done();
        }, 30);
      }, 20);
    }, 10);
  });

  it('change', done => {
    vm = createVue({
      template: `
        <div>
          <wl-carousel :interval="50" @change="handleChange">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `,
      data() {
        return {
          val: -1,
          oldVal: -1
        };
      },
      methods: {
        handleChange(val, oldVal) {
          this.val = val;
          this.oldVal = oldVal;
        }
      }
    });

    setTimeout(() => {
      expect(vm.val).to.equal(1);
      expect(vm.oldVal).to.equal(0);
      done();
    }, 60);
  });

  it('label', done => {
    vm = createVue({
      template: `
        <div>
          <wl-carousel>
            <wl-carousel-item v-for="item in 3" :key="item" :label="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
    });
    setTimeout(_ => {
      expect(vm.$el.querySelector('.wl-carousel__button').innerText).to.equal('1');
      done();
    }, 10);
  });

  describe('manual control', () => {
    it('hover', done => {
      vm = createVue({
        template: `
        <div>
          <wl-carousel :autoplay="false">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
      });

      setTimeout(() => {
        vm.$children[0].throttledIndicatorHover(1);
        setTimeout(() => {
          expect(vm.$el.querySelectorAll('.wl-carousel__item')[1].classList.contains('is-active')).to.true;
          done();
        }, 10);
      }, 10);
    });

    it('click', done => {
      vm = createVue({
        template: `
        <div>
          <wl-carousel :autoplay="false" trigger="click" ref="carousel">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
      });

      setTimeout(() => {
        const items = vm.$el.querySelectorAll('.wl-carousel__item');
        const carousel = vm.$refs.carousel;
        vm.$el.querySelectorAll('.wl-carousel__indicator')[2].click();
        setTimeout(() => {
          expect(items[2].classList.contains('is-active')).to.true;
          carousel.handleButtonEnter('right');
          vm.$el.querySelector('.wl-carousel__arrow--right').click();
          setTimeout(() => {
            expect(items[0].classList.contains('is-active')).to.true;
            done();
          }, 10);
        }, 10);
      }, 10);
    });
  });

  describe('methods', () => {
    it('setActiveItem', done => {
      vm = createVue({
        template: `
        <div>
          <wl-carousel :autoplay="false">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
      });

      setTimeout(() => {
        vm.$children[0].setActiveItem(1);
        setTimeout(() => {
          expect(vm.$el.querySelectorAll('.wl-carousel__item')[1].classList.contains('is-active')).to.true;
          done();
        }, 10);
      }, 10);
    });

    it('slide', done => {
      vm = createVue({
        template: `
        <div>
          <wl-carousel :autoplay="false">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
      });

      setTimeout(() => {
        vm.$children[0].prev(1);
        const items = vm.$el.querySelectorAll('.wl-carousel__item');
        setTimeout(() => {
          expect(items[2].classList.contains('is-active')).to.true;
          vm.$children[0].next(1);
          setTimeout(() => {
            expect(items[0].classList.contains('is-active')).to.true;
            done();
          }, 10);
        }, 10);
      }, 10);
    });
  });

  it('card', done => {
    vm = createVue({
      template: `
        <div>
          <wl-carousel :autoplay="false" type="card">
            <wl-carousel-item v-for="item in 7" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
    });

    setTimeout(() => {
      const items = vm.$el.querySelectorAll('.wl-carousel__item');
      expect(items[0].classList.contains('is-active')).to.true;
      expect(items[1].classList.contains('is-in-stage')).to.true;
      expect(items[6].classList.contains('is-in-stage')).to.true;
      items[1].click();
      setTimeout(() => {
        expect(items[1].classList.contains('is-active')).to.true;
        vm.$el.querySelector('.wl-carousel__arrow--left').click();
        setTimeout(() => {
          expect(items[0].classList.contains('is-active')).to.true;
          items[6].click();
          setTimeout(() => {
            expect(items[6].classList.contains('is-active')).to.true;
            done();
          }, 10);
        }, 10);
      }, 10);
    }, 10);
  });

  it('vertical direction', () => {
    vm = createVue({
      template: `
        <div>
          <wl-carousel ref="carousel" :autoplay="false" direction="vertical" height="100px">
            <wl-carousel-item v-for="item in 3" :key="item"></wl-carousel-item>
          </wl-carousel>
        </div>
      `
    });
    const items = vm.$el.querySelectorAll('.wl-carousel__item');

    expect(vm.$refs.carousel.direction).to.be.equal('vertical');
    expect(items[0].style.transform.indexOf('translateY') !== -1).to.be.true;
  });
});

