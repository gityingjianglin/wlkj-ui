import Pager from './main.vue';
import { valueEquals } from 'wlkj-ui/src/utils/util';
import WlSelect from 'wlkj-ui/packages/select';
import WlOption from 'wlkj-ui/packages/option';
import WlInput from 'wlkj-ui/packages/input';
export default {
  name: 'WlPagination',
  props: {
    small: {
      type: Boolean
    },
    background: {
      type: Boolean
    },
    border: {
      type: Boolean
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number
    },
    pageCount: {
      type: Number
    },
    pagerCount: {
      type: Number,
      validator(value) {
        return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1;
      },
      default: 7
    },
    currentPage: {
      type: Number
    },
    layout: {
      default: 'prev, pager, next, jumper, total'
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      }
    },
    popperClass: {
      type: String
    },
    prevText: {
      type: String
    },
    nextText: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    hideOnSinglePage: {
      type: Boolean
    }
  },
  data() {
    return {
      internalCurrentPage: 1, // 当前页数
      internalPageSize: 0, // 每页条数
      lastEmittedPage: -1,
      userChangePageSize: false
    };
  },
  render() {
    const layout = this.layout;
    if (!layout) return null;
    if (this.hideOnSinglePage && (!this.internalPageCount || this.internalPageCount === 1)) return null;
    let template = <div class={['wl-pagination', {
      'is-background': this.background,
      'wl-pagination--small': this.small,
      'is-border': this.border
    }]}></div>;
    const TEMPLATE_MAP = {
      prev: <prev></prev>,
      jumper: <jumper></jumper>,
      pager: <pager currentPage={ this.internalCurrentPage } pageCount={ this.internalPageCount } pagerCount={ this.pagerCount } on-change={ this.handleCurrentChange } disabled={ this.disabled }></pager>,
      next: <next></next>,
      sizes: <sizes pageSizes={ this.pageSizes }></sizes>,
      total: <total></total>
    };
    const components = layout.split(',').map((item) => item.trim());
    template.children = template.children || [];
    components.forEach(compo => {
      template.children.push(TEMPLATE_MAP[compo]);
    });

    return template;
  },
  components: {
    Prev: {
      render() {
        return (
          <button
            type='button'
            class='btn-prev'
            disabled={ this.$parent.disabled || this.$parent.internalCurrentPage <= 1 }
            on-click={this.$parent.prev}>
            {
              this.$parent.prevText ? <span>{ this.$parent.prevText }</span> : <i class='wl-icon wl-icon-LeftOutline'></i>
            }
          </button>
        );
      }
    },
    Next: {
      render() {
        return (
          <button
            type='button'
            class='btn-next'
            disabled={ this.$parent.disabled || this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0 }
            on-click={this.$parent.next}>
            {
              this.$parent.prevText ? <span>{ this.$parent.prevText }</span> : <i class='wl-icon wl-icon-RightOutline'></i>
            }
          </button>
        );
      }
    },
    Pager,
    Sizes: {
      props: {
        pageSizes: Array
      },
      watch: {
        pageSizes: {
          immediate: true,
          handler(newVal, oldVal) {
            if (valueEquals(newVal, oldVal)) return;
            if (Array.isArray(newVal)) {
              this.$parent.internalPageSize = newVal.indexOf(this.$parent.pageSize) > -1 ? this.$parent.pageSize : this.pageSizes[0];
            }
          }
        }
      },
      render(h) {
        return (
          <span class='wl-pagination__sizes'>
            <wl-select
              value={this.$parent.internalPageSize}
              popperClass={this.$parent.popperClass || ''}
              size='mini'
              on-input={this.handleChange}
              disabled={this.$parent.disabled}>
              {
                this.pageSizes.map(item =>
                  <wl-option
                    value={ item }
                    label={ item + '条/页' }>
                  </wl-option>
                )
              }
            </wl-select>
          </span>
        );
      },
      components: {
        WlSelect,
        WlOption
      },
      methods: {
        handleChange(val) {
          if (val !== this.$parent.internalPageSize) {
            this.$parent.internalPageSize = val = parseInt(val, 10);
            this.$parent.userChangePageSize = true;
            this.$parent.$emit('update:pageSize', val);
            this.$parent.$emit('size-change', val);
          }
        }
      },
      created() {
        console.log(this.pageSizes);
      }
    },
    Jumper: {

      components: { WlInput },

      data() {
        return {
          userInput: null
        };
      },

      watch: {
        '$parent.internalCurrentPage'() {
          this.userInput = null;
        }
      },

      methods: {
        handleKeyup({ keyCode, target }) {
          if (keyCode === 13) {
            this.handleChange(target.value);
          }
        },
        handleInput(value) {
          this.userInput = value;
        },
        handleChange(value) {
          this.$parent.internalCurrentPage = this.$parent.getValidCurrentPage(value);
          this.$parent.emitChange();
          this.userInput = null;
        }
      },

      render(h) {
        return (
          <span class="wl-pagination__jump">
            前往
            <wl-input
              class="wl-pagination__editor is-in-pagination"
              min={ 1 }
              max={ this.$parent.internalPageCount }
              value={ this.userInput !== null ? this.userInput : this.$parent.internalCurrentPage }
              disabled={ this.$parent.disabled }
              nativeOnKeyup={ this.handleKeyup }
              onInput={ this.handleInput }
              onChange={ this.handleChange }/>
            页
          </span>
        );
      }
    },

    Total: {

      render(h) {
        return (
          typeof this.$parent.total === 'number'
            ? <span class="wl-pagination__total">共{ this.$parent.total }条</span>
            : ''
        );
      }
    }
  },
  computed: {
    internalPageCount() {
      if (typeof this.total === 'number' && this.internalPageSize > 0) {
        return Math.max(1, Math.ceil(this.total / this.internalPageSize));
      } else if (typeof this.pageCount === 'number') {
        return Math.max(1, this.pageCount);
      }
      return null;
    }
  },
  methods: {
    getValidCurrentPage(value) {
      value = parseInt(value, 10);
      const havePageCount = typeof this.internalPageCount === 'number';
      let resetValue;
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else {
          if (value > this.internalPageCount) {
            resetValue = this.internalPageCount;
          }
        }
      }
      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    },
    emitChange() {
      this.$nextTick(() => {
        if (this.internalCurrentPage !== this.lastEmittedPage || this.userChangePageSize) {
          this.$emit('current-change', this.internalCurrentPage);
          this.lastEmittedPage = this.internalCurrentPage;
          this.userChangePageSize = false;
        }
      });
    },
    prev() {
      if (this.disabled) return;
      if (this.internalCurrentPage > 1) {
        this.internalCurrentPage = this.internalCurrentPage - 1;
      }
      this.$emit('handleCurrentChange', this.internalCurrentPage);
    },
    handleCurrentChange(val) {
      this.internalCurrentPage = val;
      this.$emit('handleCurrentChange', val);
    },
    next(val) {
      if (this.disabled) return;
      if (this.internalCurrentPage < this.internalPageCount) {
        this.internalCurrentPage = this.internalCurrentPage + 1;
      }
      this.$emit('handleCurrentChange', this.internalCurrentPage);
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(val) {
        this.internalCurrentPage = this.getValidCurrentPage(val);
      }
    },

    pageSize: {
      immediate: true,
      handler(val) {
        this.internalPageSize = isNaN(val) ? 10 : val;
      }
    },

    internalCurrentPage: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:currentPage', newVal);
        this.lastEmittedPage = -1;
      }
    },

    internalPageCount(newVal) {
      /* istanbul ignore if */
      const oldPage = this.internalCurrentPage;
      if (newVal > 0 && oldPage === 0) {
        this.internalCurrentPage = 1;
      } else if (oldPage > newVal) {
        this.internalCurrentPage = newVal === 0 ? 1 : newVal;
        this.userChangePageSize && this.emitChange();
      }
      this.userChangePageSize = false;
    }
  }
};
