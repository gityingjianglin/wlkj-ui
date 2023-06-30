import { destroyVM, createVue, waitImmediate } from '../util';
// import Transfer from 'packages/transfer';

describe('Transfer', () => {
  // const getDatePickerVm = (configs = {}, options) => {
  //   configs.data = configs.data || [];
  //   configs.value = configs.value || [];
  //   const vm = createVue({
  //     template: `
  //       <div>
  //       <wl-transfer
  //         v-model="value"
  //         :data="data"
  //         :left-default-checked="[2, 3]"
  //         :right-default-checked="[1]"
  //         :titles="['Source', 'Target']"
  //         :button-texts="['到左边', '到右边']"
  //         @change="transferHandleChange"
  //         :target-order="targetOrder"></wl-transfer>
  //       </div>
  //     `,

  //     data() {
  //       const generateData = _ => {
  //         const data = [];
  //         for (let i = 1; i <= 15; i++) {
  //           data.push({
  //             value: i,
  //             desc: `备选项 ${ i }`,
  //             disabled: i % 4 === 0
  //           });
  //         }
  //         return data;
  //       };
  //       return {
  //         data: generateData(),
  //         value: [1, 4]
  //       };
  //     }
  //   }, true);
  //   return vm;
  // };
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createVue({
      template: `
        <wl-transfer
          v-model="value"
          :data="data"></wl-transfer>
      `,
      date() {
        const generateData = _ => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        };
        return {
          data: generateData(),
          value: [1, 4]
        };
      }
    }, true);
    let transferElm = vm.$el;
    // console.log('colElm.classList');
    // console.log(colElm.classList);
    expect(transferElm.classList.contains('wl-transfer')).to.be.true;
    // expect(colElm.classList.contains('wl-transfer-panel')).to.be.true;
    // expect(colElm.classList.contains('wl-transfer-panel__header')).to.be.true;
  });

  it('value', async() => {
    vm = createVue({
      template: `
        <wl-transfer
          v-model="value"
          ref='transferRef'
          :data="data"></wl-transfer>
      `,
      data() {
        const generateData = _ => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        };
        return {
          data: generateData(),
          value: [1, 4]
        };
      }
    }, true);
    // let transferElm = vm.$el;
    await waitImmediate();
    console.log('colElm.classList');
    console.log(vm.$refs.transferRef.cardNumList);
    console.log(vm.$refs.transferRef.chooseCardList);
    expect(vm.$refs.transferRef.chooseCardList.length).to.equal(2);
  });

  it('default-left-choose', async() => {
    vm = createVue({
      template: `
        <wl-transfer
          v-model="value"
          ref='transferRef'
          :left-default-checked="[2, 3]"
          :data="data"></wl-transfer>
      `,
      data() {
        const generateData = _ => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        };
        return {
          data: generateData(),
          value: [1, 4]
        };
      }
    }, true);
    // let transferElm = vm.$el;
    await waitImmediate();
    console.log('colElm.classList');
    console.log(vm.$refs.transferRef.cardNumList);
    console.log(vm.$refs.transferRef.checkedCardLeft);
    let checkedCardLeft = vm.$refs.transferRef.checkedCardLeft.join(',');
    expect(checkedCardLeft).to.equal('备选项 3,备选项 5');
  });

  it('default-right-choose', async() => {
    vm = createVue({
      template: `
        <wl-transfer
          v-model="value"
          ref='transferRef'
          :right-default-checked="[1]"
          :data="data"></wl-transfer>
      `,
      data() {
        const generateData = _ => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        };
        return {
          data: generateData(),
          value: [1, 4]
        };
      }
    }, true);
    // let transferElm = vm.$el;
    await waitImmediate();
    console.log('colElm.classList');
    console.log(vm.$refs.transferRef.cardNumList);
    console.log(vm.$refs.transferRef.checkedCardRight);
    let checkedCardRight = vm.$refs.transferRef.checkedCardRight.join(',');
    expect(checkedCardRight).to.equal('备选项 1');
  });

  it('titles', async() => {
    vm = createVue({
      template: `
        <wl-transfer
          v-model="value"
          ref='transferRef'
          :titles="['Source', 'Target']"
          :data="data"></wl-transfer>
      `,
      data() {
        const generateData = _ => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        };
        return {
          data: generateData(),
          value: [1, 4]
        };
      }
    }, true);
    let transferElm = vm.$el;
    await waitImmediate();
    console.log('checkboxLable.innerText');
    let checkboxLable = transferElm.querySelector('.wl-checkbox__label');
    console.log(checkboxLable.innerText);
    // console.log(vm.$refs.transferRef.cardNumList);
    // console.log(vm.$refs.transferRef.checkedCardRight);
    // let checkedCardRight = vm.$refs.transferRef.checkedCardRight.join(',');
    expect(checkboxLable.innerText.includes('Source')).to.be.true;
  });

  it('button-texts', async() => {
    vm = createVue({
      template: `
        <wl-transfer
          v-model="value"
          ref='transferRef'
          :button-texts="['到左边', '到右边']"
          :data="data"></wl-transfer>
      `,
      data() {
        const generateData = _ => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        };
        return {
          data: generateData(),
          value: [1, 4]
        };
      }
    }, true);
    let transferElm = vm.$el;
    await waitImmediate();
    console.log('checkboxLable.innerText');
    let button = transferElm.querySelector('.wl-button span');
    console.log(button.innerText);
    expect(button.innerText.includes('到左边')).to.be.true;
  });
});
