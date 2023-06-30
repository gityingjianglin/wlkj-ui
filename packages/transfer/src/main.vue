<!-- Transfer  -->
<template>
  <div class="wl-transfer">
    <div class="wl-transfer-panel">
      <p class="wl-transfer-panel__header">
        <wl-checkbox :indeterminate="isIndeterminateLeft" v-model="checkAllCardLeft" @change="handleCheckAllLeftChange">
          {{titles && titles[0] ? titles[0] : '列表 1'}}
          <span>{{checkedCardLeft.length}}/{{cardNumList.length}}</span>
        </wl-checkbox>
      </p>
      <div class="wl-transfer-panel__body">
        <wl-scrollbar :style="{height: '100%'}">
          <wl-checkbox-group v-model="checkedCardLeft" @change="handleCheckedCardLeftChange">
            <wl-checkbox v-for="(item, index) in cardNumList" :label="item" :key="index" :disabled="getCardNumList[index].disabled">{{item}}</wl-checkbox>
          </wl-checkbox-group>
          <div class="wl-transfer-panel__empty" v-show="cardNumList.length === 0">无数据</div>
        </wl-scrollbar>
      </div>
    </div>
    <div class="wl-transfer__buttons">
      <wl-button @click="gotoLeft" :disabled="checkedCardRight.length == 0" type="primary"><i class="wl-icon-arrow-left"></i>{{ buttonTexts && buttonTexts[0] ? buttonTexts[0] : '' }}</wl-button>
      <wl-button :disabled="checkedCardLeft.length == 0" @click="gotoRight" type="primary">{{ buttonTexts && buttonTexts[1] ? buttonTexts[1] : '' }}<i class="wl-icon-arrow-right"></i></wl-button>
    </div>
    <div class="wl-transfer-panel">
      <!-- <div class="etc-top h-view align-center">
        <wl-checkbox :indeterminate="isIndeterminateRight" v-model="checkAllCardRight" @change="handleCheckAllRightChange">
          <span class="h-view align-center justify-space-between flex1">
            列表 2
            <span>{{checkedCardRight.length}}/{{chooseCardList.length}}条</span>
          </span>
        </wl-checkbox>
      </div> -->
      <p class="wl-transfer-panel__header">
        <wl-checkbox :indeterminate="isIndeterminateRight" v-model="checkAllCardRight" @change="handleCheckAllRightChange">
          {{titles && titles[1] ? titles[1] : '列表 2'}}
          <span>{{checkedCardRight.length}}/{{chooseCardList.length}}</span>
        </wl-checkbox>
      </p>
      <!-- <div class="etc-content-box">
        <wl-scrollbar>
          <wl-checkbox-group v-model="checkedCardRight" @change="handleCheckedCardRightChange">
            <wl-checkbox v-for="(item, index) in chooseCardList" :label="item" :key="index">{{item}}</wl-checkbox>
          </wl-checkbox-group>
        </wl-scrollbar>
      </div> -->
      <div class="wl-transfer-panel__body">
        <wl-scrollbar :style="{height: '100%'}">
          <wl-checkbox-group v-model="checkedCardRight" @change="handleCheckedCardRightChange">
            <wl-checkbox v-for="(item, index) in chooseCardList" :label="item" :key="index" :disabled="originalChooseCardList[index].disabled">{{item}}</wl-checkbox>
          </wl-checkbox-group>
          <div class="wl-transfer-panel__empty" v-show="chooseCardList.length === 0">无数据</div>
        </wl-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import wlCheckbox from 'wlkj-ui/packages/checkbox';
import wlScrollbar from 'wlkj-ui/packages/scrollbar';
import wlButton from 'wlkj-ui/packages/button';
export default {
  name: 'WlTransfer',
  data() {
    return {
      checkedCardRight: [],
      checkAllCardLeft: false,
      isIndeterminateLeft: false,
      checkedCardLeft: [],
      isIndeterminateRight: false,
      checkAllCardRight: false,
      chooseCardList: [],
      cardNumList: [],
      getCardNumList: [], // 左侧用户传入的原始数据
      originalChooseCardList: [], // 移动到右侧的原始数据
      wlTransferIndex: 'wlTransferIndex'
    };
  },

  props: {
    data: {
      type: Array
    },
    value: {
      type: Array
    },
    props: {
      type: Object
    },
    leftDefaultChecked: {
      type: Array
    },
    rightDefaultChecked: {
      type: Array
    },
    titles: {
      type: Array
    },
    buttonTexts: {
      type: Array
    },
    targetOrder: {
      type: String,
      default: 'original'
    }
  },

  components: {
    wlCheckbox,
    wlScrollbar,
    wlButton
  },

  computed: {
  },

  methods: {
    handleCheckAllLeftChange(val) { // 可选卡片操作是否全选
      let cardNumList = [];
      this.cardNumList.forEach((item, index) => {
        if (!this.getCardNumList[index].disabled) {
          cardNumList.push(item);
        }
      });
      this.checkedCardLeft = val ? cardNumList : [];
      this.isIndeterminateLeft = false;
    },
    handleCheckedCardLeftChange(value) { // 可选卡片操作
      this.checkedCardLeft = value;
      let length = 0;
      this.getCardNumList.forEach(item => {
        if (!item.disabled) {
          length++;
        }
      });
      let checkedCount = value.length;
      this.checkAllCardLeft = checkedCount === length;
      this.isIndeterminateLeft = checkedCount > 0 && checkedCount < length;
    },
    handleCheckedCardRightChange(value) { // 已选卡片操作
      this.checkedCardRight = value;
      let length = 0;
      this.originalChooseCardList.forEach(item => {
        if (!item.disabled) {
          length++;
        }
      });
      let checkedCount = value.length;
      this.checkAllCardRight = checkedCount === length;
      this.isIndeterminateRight = checkedCount > 0 && checkedCount < length;
    },
    handleCheckAllRightChange(val) { // 已选卡片操作是否全选
      this.checkedCardRight = val ? this.chooseCardList : [];
      this.isIndeterminateRight = false;
    },
    gotoRight() {
      let movedKeys = [];
      let valueArr = [];
      // console.log(this.chooseCardList);
      // console.log(this.checkedCardLeft);
      // this.chooseCardList = this.chooseCardList.concat(this.checkedCardLeft);
      // 根据wlTransferIndex判断插入位置，wlTransferIndex为最初索引
      for (let i = 0; i < this.cardNumList.length; i++) {
        for (let j = 0, length1 = this.checkedCardLeft.length; j < length1; j++) {
          if (this.cardNumList[i] === this.checkedCardLeft[j]) {
            movedKeys.push(this.getCardNumList[i][this.wlTransferIndex]);
            this.cardNumList.splice(i, 1);
            if (this.targetOrder === 'unshift') {
              this.originalChooseCardList.unshift(this.getCardNumList[i]);
            } else {
              this.originalChooseCardList.push(this.getCardNumList[i]);
            }
            this.getCardNumList.splice(i, 1);
            // console.log(this.cardNumList);
            i--;
            break;
          }
        }
      }
      if (this.targetOrder === 'original') {
        this.originalChooseCardList.sort((a, b) => {
          return a[this.wlTransferIndex] - b[this.wlTransferIndex];
        });
      }
      let chooseCardList = [];
      this.originalChooseCardList.forEach(item => {
        chooseCardList.push(item.label);
        valueArr.push(item[this.wlTransferIndex]);
      });
      this.chooseCardList = chooseCardList;
      this.checkedCardLeft = [];
      this.isIndeterminateLeft = false;
      this.checkAllCardLeft = false;
      this.$emit('change', ...[valueArr, 'right', movedKeys]);
    },
    gotoLeft() {
      let movedKeys = [];
      let valueArr = [];
      for (let i = 0; i < this.chooseCardList.length; i++) {
        for (let j = 0, length1 = this.checkedCardRight.length; j < length1; j++) {
          if (this.chooseCardList[i] === this.checkedCardRight[j]) {
            movedKeys.push(this.originalChooseCardList[i][this.wlTransferIndex]);
            this.chooseCardList.splice(i, 1);
            this.getCardNumList.push(this.originalChooseCardList[i]);
            this.originalChooseCardList.splice(i, 1);
            i--;
            break;
          }
        }
      }
      this.getCardNumList.sort((a, b) => {
        return a[this.wlTransferIndex] - b[this.wlTransferIndex];
      });
      let cardNumList = [];
      this.getCardNumList.forEach(item => {
        cardNumList.push(item.label);
      });
      this.originalChooseCardList.forEach(item => {
        valueArr.push(item[this.wlTransferIndex]);
      });
      this.cardNumList = cardNumList;
      this.checkedCardRight = [];
      this.isIndeterminateRight = false;
      this.checkAllCardRight = false;
      this.$emit('change', ...[valueArr, 'left', movedKeys]);
    },
    editData(val) {
      if (val && val.length > 0) {
        let cardNumList = [];
        // let cardNumDisabledList = [];
        let originalChooseCardList = [];
        let getCardNumList = [];
        let chooseCardList = [];
        val.forEach((item, index) => {
          let key = 'key';
          let label = 'label';
          let disabled = 'disabled';
          if (this.props) {
            key = this.props.key || 'key';
            label = this.props.label || 'label';
            disabled = this.props.disabled || 'disabled';
          }
          item.key = item[key];
          item.label = item[label];
          item.disabled = item[disabled];
          // getCardNumList.push(item.label);
          item[this.wlTransferIndex] = index + 1; // 用于穿梭时插入的位置
          // cardNumDisabledList.push(item.disabled);
        });
        if (this.value.length > 0) {
          // [1, 4]
          for (let i = 0, length = val.length; i < length; i++) {
            let isChoose = false;
            for (let j = 0, length1 = this.value.length; j < length1; j++) {
              if ((i + 1) === this.value[j]) {
                isChoose = true;
                break;
              }
            }
            if (isChoose) {
              originalChooseCardList.push(val[i]);
            } else {
              getCardNumList.push(val[i]);
            }
          }
          originalChooseCardList.forEach(item => {
            chooseCardList.push(item.label);
          });
        } else {
          val.forEach((item, index) => {
            getCardNumList.push(item.label);
            // cardNumDisabledList.push(item.disabled);
          });
        }
        getCardNumList.forEach(item => {
          cardNumList.push(item.label);
        });
        console.log('cardNumList');
        console.log(cardNumList);
        this.cardNumList = cardNumList;
        this.chooseCardList = chooseCardList;
        this.getCardNumList = JSON.parse(JSON.stringify(getCardNumList));
        this.originalChooseCardList = JSON.parse(JSON.stringify(originalChooseCardList));
        if (this.leftDefaultChecked) {
          let leftChoose = [];
          this.leftDefaultChecked.forEach(item => {
            leftChoose.push(cardNumList[item - 1]);
            this.handleCheckedCardLeftChange(leftChoose);
          });
        }
        if (this.rightDefaultChecked) {
          let rightChoose = [];
          this.rightDefaultChecked.forEach(item => {
            rightChoose.push(chooseCardList[item - 1]);
            this.handleCheckedCardRightChange(rightChoose);
          });
        }
      } else {
        this.cardNumList = [];
        this.cardNumDisabledList = [];
      }
    }
  },

  mounted() {},

  created() {
    this.editData(this.data);
  },
  watch: {
    data(val) {
      this.editData(val);
    }
  }
};

</script>
<style lang='scss' scoped>
</style>