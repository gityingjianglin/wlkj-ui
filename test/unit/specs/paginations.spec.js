import { destroyVM, createVue } from '../util';

describe('Paginations', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createVue({
      template: `
        <wl-pagination
          layout="prev, pager, next"
          :total="400">
        </wl-pagination>
      `,
      data() {
        return {
          currentPage: 1
        };
      },
      methods: {
      }
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('wl-pagination')).to.be.true;
  });
  it('background', () => {
    vm = createVue({
      template: `
        <wl-pagination
          background
          layout="prev, pager, next"
          :total="400">
        </wl-pagination>
      `,
      data() {
        return {
          currentPage: 1
        };
      },
      methods: {}
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('is-background')).to.be.true;
  });
  it('small', () => {
    vm = createVue({
      template: `
        <wl-pagination
          small
          layout="prev, pager, next"
          :total="400">
        </wl-pagination>
      `,
      data() {
        return {
          currentPage: 1
        };
      },
      methods: {}
    }, true);
    let colElm = vm.$el;
    console.log(colElm.classList);
    expect(colElm.classList.contains('wl-pagination--small')).to.be.true;
  });
  it('next-page', () => {
    vm = createVue({
      template: `
        <wl-pagination
          small
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          ref='pagination'
          :total="400">
        </wl-pagination>
      `,
      data() {
        return {
          currentPage: 1
        };
      },
      methods: {
        handleCurrentChange(val) {
          console.log('next page');
          console.log(`当前页: ${val}`);
        }
      }
    }, true);
    // const spy = sinon.spy();
    // vm.$refs.datePicker.$on('focus', spy);
    vm.$refs.pagination.next();
    // vm.$nextTick(_ => {
    //   console.log(vm.$refs.pagination._data.internalCurrentPage);
    //   console.log('vm');
    //   console.log(vm._data.currentPage);
    //   expect(vm.$refs.pagination._data.internalCurrentPage).to.equal(2);
    //   done();
    // });
    expect(vm.$refs.pagination._data.internalCurrentPage).to.equal(2);
  });
  it('prev-page', () => {
    vm = createVue({
      template: `
      <wl-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="40"
        layout="total, sizes, prev, pager, next, jumper"
        ref='pagination'
        :total="400">
      </wl-pagination>
      `,
      data() {
        return {
          currentPage: 2
        };
      },
      methods: {
      }
    }, true);
    // const spy = sinon.spy();
    // vm.$refs.datePicker.$on('focus', spy);
    vm.$refs.pagination.prev();
    // vm.$nextTick(_ => {
    //   console.log(vm.$refs.pagination._data.internalCurrentPage);
    //   console.log('vm');
    //   console.log(vm._data.currentPage);
    //   expect(vm.$refs.pagination._data.internalCurrentPage).to.equal(2);
    //   done();
    // });
    expect(vm.$refs.pagination._data.internalCurrentPage).to.equal(1);
  });
});
