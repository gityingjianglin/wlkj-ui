import { createVue, destroyVM, waitImmediate } from '../util';

describe('Progress', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createVue({
      template: `
        <div>
          <wl-progress :percentage="0" ref="progress0"></wl-progress>
          <wl-progress :percentage="50" ref="progress50"></wl-progress>
        </div>
      `
    }, true);
    expect(vm.$refs.progress0.$el.querySelector('.wl-progress__text').innerText).to.be.equal('0%');
    expect(vm.$refs.progress0.$el.querySelector('.wl-progress-bar__inner').style.width).to.be.equal('0%');
    expect(vm.$refs.progress50.$el.querySelector('.wl-progress__text').innerText).to.be.equal('50%');
    expect(vm.$refs.progress50.$el.querySelector('.wl-progress-bar__inner').style.width).to.be.equal('50%');
  });
  it('status', () => {
    vm = createVue({
      template: `
        <div>
          <wl-progress ref="lineSuccess" :percentage="50" status="success"></wl-progress>
          <wl-progress ref="lineException" :percentage="70" status="exception"></wl-progress>
          <wl-progress type="circle" ref="circleSuccess" :percentage="30" status="success"></wl-progress>
          <wl-progress type="circle" ref="circleException" :percentage="80" status="exception"></wl-progress>
        </div>
      `
    }, true);
    expect(vm.$refs.lineSuccess.$el.classList.contains('is-success')).to.be.true;
    expect(vm.$refs.lineSuccess.$el.querySelector('.wl-progress__text .wl-icon-CheckCircleOutline')).to.be.exist;

    expect(vm.$refs.lineException.$el.classList.contains('is-exception')).to.be.true;
    expect(vm.$refs.lineException.$el.querySelector('.wl-progress__text .wl-icon-InformationCircleOutline')).to.be.exist;

    expect(vm.$refs.circleSuccess.$el.classList.contains('is-success')).to.be.true;
    expect(vm.$refs.circleSuccess.$el.querySelector('.wl-progress__text .wl-icon-CheckCircleOutline')).to.be.exist;

    expect(vm.$refs.circleException.$el.classList.contains('is-exception')).to.be.true;
    expect(vm.$refs.circleException.$el.querySelector('.wl-progress__text .wl-icon-InformationCircleOutline')).to.be.exist;
  });
  it('text-inside', () => {
    vm = createVue({
      template: `
        <wl-progress :percentage="50" :text-inside="true"></wl-progress>
      `
    }, true);
    expect(vm.$el.classList.contains('wl-progress--text-inside')).to.be.true;
  });
  it('text-without', () => {
    vm = createVue({
      template: `
        <wl-progress :percentage="50" :show-text="false"></wl-progress>
      `
    }, true);
    expect(vm.$el.classList.contains('wl-progress--text-without')).to.be.true;
  });
  it('stroke-width', () => {
    vm = createVue({
      template: `
        <wl-progress :percentage="50" :stroke-width="10"></wl-progress>
      `
    }, true);
    expect(vm.$el.querySelector('.wl-progress-bar__outer').style.height).to.be.equal('10px');
  });
  it('color', () => {
    vm = createVue({
      template: `
        <wl-progress :percentage="50" color="rgb(255, 0, 255)"></wl-progress>
      `
    }, true);
    expect(vm.$el.querySelector('.wl-progress-bar__inner').style.backgroundColor).to.be.equal('rgb(255, 0, 255)');
  });
  it('color is a function', async() => {
    vm = createVue({
      template: `
        <wl-progress :percentage="percentage" :color="colorHandler"></wl-progress>
      `,
      data() {
        return {
          percentage: 60
        };
      },
      methods: {
        colorHandler(percentage) {
          if (percentage > 50) {
            return 'rgb(11, 22, 33)';
          } else {
            return 'rgb(0, 1, 2)';
          }
        },
        changePercentage() {
          this.percentage = 10;
        }
      }
    }, true);
    expect(vm.$el.querySelector('.wl-progress-bar__inner').style.backgroundColor).to.be.equal('rgb(11, 22, 33)');
    vm.changePercentage();
    await waitImmediate();
    expect(vm.$el.querySelector('.wl-progress-bar__inner').style.backgroundColor).to.be.equal('rgb(0, 1, 2)');
  });
  it('color is an array with string', () => {
    vm = createVue({
      template: `
        <wl-progress :percentage="percentage" :color="colorArray"></wl-progress>
      `,
      data() {
        return {
          percentage: 60,
          colorArray: [
            'rgb(1, 1, 1)', 'rgb(2, 2, 2)', 'rgb(3, 3, 3)'
          ]
        };
      }
    }, true);
    expect(vm.$el.querySelector('.wl-progress-bar__inner').style.backgroundColor).to.be.equal('rgb(2, 2, 2)');
  });
  it('color is an array with object', async() => {
    vm = createVue({
      template: `
        <wl-progress :percentage="percentage" :color="colorArrayObject"></wl-progress>
      `,
      data() {
        return {
          percentage: 25,
          colorArrayObject: [
            {
              color: 'rgb(1, 1, 1)',
              percentage: '20'
            },
            {
              color: 'rgb(2, 2, 2)',
              percentage: '40'
            },
            {
              color: 'rgb(3, 3, 3)',
              percentage: '60'
            },
            {
              color: 'rgb(4, 4, 4)',
              percentage: '80'
            }
          ]
        };
      },
      methods: {
        changePercentage() {
          this.percentage = 50;
        }
      }
    }, true);
    expect(vm.$el.querySelector('.wl-progress-bar__inner').style.backgroundColor).to.be.equal('rgb(2, 2, 2)');
    vm.changePercentage();
    await waitImmediate();
    expect(vm.$el.querySelector('.wl-progress-bar__inner').style.backgroundColor).to.be.equal('rgb(3, 3, 3)');
  });
  it('width', () => {
    vm = createVue({
      template: `
        <wl-progress :percentage="50" type="circle" :width="150"></wl-progress>
      `
    }, true);
    expect(vm.$el.querySelector('.wl-progress-circle').style.width).to.be.equal('150px');
  });
  it('format content', () => {
    vm = createVue({
      template: `
        <wl-progress :percentage="60" :format="formatHandler"></wl-progress>
      `,
      methods: {
        formatHandler(percentage) {
          return `占比为${percentage}%`;
        }
      }
    }, true);
    expect(vm.$el.querySelector('.wl-progress__text').innerText).to.be.equal('占比为60%');
  });
});
