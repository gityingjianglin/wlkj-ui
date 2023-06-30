<!--  -->
<template>
  <div class="wl-picker-panel wl-date-picker wl-popper">
      <div class="wl-picker-panel__body-wrapper">
        <div class="wl-picker-panel__body">
          <div class="wl-date-picker__header">
            <button type="button" aria-label="前一年" class="wl-picker-panel__icon-btn wl-date-picker__prev-btn wl-icon-d-arrow-left" @click="changeDate"></button>
            <button type="button" aria-label="上个月" class="wl-picker-panel__icon-btn wl-date-picker__prev-btn wl-icon-arrow-left" @click="changeDate"></button>
            <span role="button" class="wl-date-picker__header-label">{{this.year}} 年</span>
            <span role="button" class="wl-date-picker__header-label">{{this.month}} 月</span>
            <button type="button" aria-label="后一年" class="wl-picker-panel__icon-btn wl-date-picker__next-btn wl-icon-d-arrow-right" @click="changeDate"></button>
            <button type="button" aria-label="下个月" class="wl-picker-panel__icon-btn wl-date-picker__next-btn wl-icon-arrow-right" @click="changeDate"></button>
          </div>
          <div class="wl-picker-panel__content">
            <table cellspacing="0" cellpadding="0" class="wl-date-table">
              <tbody>
                <tr>
                  <th v-for="(item, index) in week" :key="index">
                    <span>{{item}}</span>
                  </th>
                </tr>
                <tr v-for='(item, index) in date' :key='index' class='wl-date-table__row'>
                  <td v-for='(day, i) in item' :key='i' @click.stop='getClickTime(day, pickerOptions && pickerOptions.disabledDate(new Date(day.date)))'  :class='{available: !day.notNowMonth, "prev-month": day.notNowMonth, weekend: (i == 0 || i == 6) && !day.notNowMonth, available: !day.notNowMonth, today: day.currentDateFlag, current: day.date === clickDay, disable: pickerOptions && pickerOptions.disabledDate(new Date(day.date))}'>
                    <div>
                      <span>{{day.dayDate}}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: {
        year: '',
        month: '',
        dayDate: ''
      },
      year: '',
      month: '',
      week: ['日', '一', '二', '三', '四', '五', '六'],
      date: [],
      dateArr: [],
      nowTime: new Date().getTime(),
      lastMonthDays: '',
      clickDay: '',
      disableDate: '',
      hasRange: false
    };
  },
  props: {
    pickerOptions: {
      type: Object
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    prev() {
      if (this.month === 1) {
        this.month = 12;
        this.year = this.year - 1;
      } else {
        this.month = this.month - 1;
      }
      this.renderSchedule(this.year, this.month);
    },
    next() {
      if (this.month === 12) {
        this.month = 1;
        this.year = this.year + 1;
      } else {
        this.month = this.month + 1;
      }
      this.renderSchedule(this.year, this.month);
    },
    prevYear() {
      this.year = this.year - 1;
      this.renderSchedule(this.year, this.month);
    },
    nextYear() {
      this.year = this.year + 1;
      this.renderSchedule(this.year, this.month);
    },
    renderSchedule(year, month) {
      if (month === 1) {
        this.nowMonth = year + '年' + month + '月';
      } else {
        this.nowMonth = month + '月';
      }
      month = month - 1;
      // 当月第一天星期几
      let firstDay = new Date(year, month, 1).getDay();
      // 当月总共多少天
      let totalDate = new Date(year, month + 1, 0).getDate();
      // 上个月总共多少天
      let lastMonthTotalDate = new Date(year, month, 0).getDate();
      // 保持6行显示日期，补满下月需要显示的天数
      let nextMonthPushDays = 0;
      // 二维数组展示日程
      let temp = [];
      // 数据行数
      let line = 0;
      // 循环总天数，展示二位数组日程
      for (let i = 1; i <= totalDate; i++) {
        let cDay = new Date(year, month, i).getDay();
        if (cDay === 0) {
          temp[line] = [];
          if (i === 1) {
            let transDay = cDay === 0 ? 7 : cDay;
            let lastMonthDateStart = lastMonthTotalDate - (transDay - 1);
            for (let j = 0; j < 7; j++) {
              temp[line].push(Object.assign(
                {dayDate: lastMonthDateStart, notNowMonth: true},
                {date: this.makeDateString(year, (month + 1), lastMonthDateStart, 'prev')},
                {clickDay: this.makeDateString(year, (month + 1), lastMonthDateStart, 'prev') === this.clickTime ? 1 : false}
              ));
              lastMonthDateStart++;
            }
            line++;
            temp[line] = [];
            this.lastMonthDays = 7;
          }
        }
        if (i === 1 && cDay !== 0) {
          this.lastMonthDays = firstDay;
          temp[line] = [];
          let transDay = cDay;
          let lastMonthDateStart = lastMonthTotalDate - (transDay - 1);
          // console.log(lastMonthDateStart);
          // 补齐上个月的日期显示，周日排在最后一列，如果是周日，则循环前面6次
          let loop = firstDay === 0 ? 7 : firstDay;
          // debugger
          for (let j = 0; j < loop; j++) {
            temp[line].push(Object.assign(
              {dayDate: lastMonthDateStart, notNowMonth: true},
              {date: this.makeDateString(year, (month + 1), lastMonthDateStart, 'prev')},
              {clickDay: this.makeDateString(year, (month + 1), lastMonthDateStart, 'prev') === this.clickTime ? 1 : false}
            ));
            lastMonthDateStart++;
          }
        }
        temp[line].push(Object.assign(
          {dayDate: i},
          {date: this.makeDateString(year, (month + 1), i)},
          {currentDateFlag: this.checkCurrentDate(year, month + 1, i)},
          {clickDay: this.makeDateString(year, (month + 1), i) === this.clickTime ? 1 : false}
        ));
        if (cDay === 6 && i < totalDate) {
          line++;
        } else if (i === totalDate && cDay !== 6) {
          let k = 1;
          for (let d = cDay; d < 6; d++) {
            temp[line].push(Object.assign(
              {dayDate: k, notNowMonth: true},
              {date: this.makeDateString(year, (month + 1), k, 'next')},
              {clickDay: this.makeDateString(year, (month + 1), k, 'next') === this.clickTime ? 1 : false}
            ));
            k++;
          }
          nextMonthPushDays = k;
        } else {
          nextMonthPushDays = 1;
        }
        if (line < 5 && nextMonthPushDays > 0) {
          for (let i = line + 1; i <= 5; i++) {
            temp[i] = [];
            let start = nextMonthPushDays;
            for (let j = start; j <= start + 6; j++) {
              temp[i].push(Object.assign(
                {dayDate: j, notNowMonth: true},
                {date: this.makeDateString(year, (month + 1), j, 'next')},
                {clickDay: this.makeDateString(year, (month + 1), j, 'next') === this.clickTime ? 1 : false}
              ));
            }
          }
        }
      }
      this.date = temp;
      this.dateArr = [];
      for (let i = 0; i < this.date.length; i++) {
        this.dateArr = this.dateArr.concat(this.date[i]);
      }
      // console.log(temp);
    },
    // 选择日期
    getClickTime(day, bool) {
      if (!bool) {
        console.log(day);
        this.clickDay = day.date;
        console.log('3333333');
        this.$emit('getTime', day);
      }
    },
    // 检测是否是当天
    checkCurrentDate(year, month, date) {
      if (year === this.currentDate.year && month === this.currentDate.month && date === this.currentDate.dayDate) {
        return true;
      }
      return false;
    },
    // 生成日期格式
    // type: '' 生成当前日期, type: 'prev' 上个月日期, type: 'next' 下个月日期
    makeDateString(year, month, date, type) {
      if (year && month && date) {
        if (type === 'prev') {
          month = month - 1;
          if (month <= 0) {
            month = 12;
            year = year - 1;
          }
        } else if (type === 'next') {
          month = month + 1;
          if (month > 12) {
            month = 1;
            year = year + 1;
          }
        }
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        return year + '-' + month + '-' + date;
      }
    },
    changeDate(e) {
      // console.log(e);
      switch (e.target.ariaLabel) {
        case '上个月':
          this.prev();
          break;
        case '下个月':
          this.next();
          break;
        case '前一年':
          this.prevYear();
          break;
        case '后一年':
          this.nextYear();
          break;
      }
    },
    init(date) {
      let currentDate = new Date();
      this.currentDate.year = this.year = currentDate.getFullYear();
      this.currentDate.month = this.month = currentDate.getMonth() + 1;
      this.currentDate.dayDate = currentDate.getDate();
      this.renderSchedule(this.year, this.month);
    }
  },
  created() {
    this.init();
    // if (this.pickerOptions && this.pickerOptions.disabledDate) {
    //   this.hasRange = true;
    // }
  }
};

</script>
<style lang='scss' scoped>
</style>