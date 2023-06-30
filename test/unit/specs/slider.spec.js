import { createVue, destroyVM } from '../util';
// import Slider from 'packages/slider';

describe('Slider', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('disabled', () => {
    vm = createVue({
      template: `
      <wl-slider :value='50' ref="slider" disabled></wl-slider>
      `
    });
    let SliderElm = vm.$refs.slider;
    let sliderTem = SliderElm.$el;
    let sliderElm = sliderTem.querySelector('.wl-slider__runway');
    expect(sliderElm.classList.contains('is-disabled')).to.be.true;
  });
  it('vertical', () => {
    vm = createVue({
      template: `
      <wl-slider :value='50' ref="slider" vertical height="200px"></wl-slider>
      `
    });
    let SliderElm = vm.$refs.slider;
    let sliderTem = SliderElm.$el;
    let sliderElm = sliderTem.querySelector('.wl-slider__runway');
    console.log(sliderElm.style.height, 'style');
    expect(sliderElm.style.height).to.be.equals('200px');
    expect(sliderTem.classList.contains('is-vertical')).to.be.true;
  });
  it('value', () => {
    vm = createVue({
      template: `
      <wl-slider :value='50' ref="slider" ></wl-slider>
      `,
      data() {
        return {
          barWidth: this.value
        };
      }
    });
    let SliderVm = vm.$refs.slider;
    expect(SliderVm.barWidth).to.be.equals(50);
  });
});
