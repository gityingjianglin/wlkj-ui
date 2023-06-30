<template>
  <div
    class="wl-progress"
    :class="[
      'wl-progress--' + type,
      status ? 'is-' + status : '',
      {
        'wl-progress--text-inside': textInside,
        'wl-progress--text-without': !showText
      }
    ]"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
    role="progressbar"
  >
    <div class="wl-progress-bar" v-if="type === 'line'">
      <div class="wl-progress-bar__outer" :style="{height: strokeWidth + 'px'}">
        <div class="wl-progress-bar__inner" :style="barStyle">
          <div class="wl-progress-bar__innerText" v-if="showText && textInside">{{content}}</div>
        </div>
      </div>
    </div>
    <div class="wl-progress-circle" v-else :style="{width: this.width + 'px', height: this.width + 'px'}">
      <svg viewBox="0 0 100 100">
        <path
          class="wl-progress-circle__track"
          :d="trackPath"
          stroke="#e5e9f2"
          :stroke-width="relativeStrokeWidth"
          fill="none"
          :style="trailPathStyle"
        ></path>
        <path
          class="wl-progress-circle__path"
          :d="trackPath"
          :stroke="stroke"
          :stroke-width="percentage ? relativeStrokeWidth : 0"
          fill="none"
          :stroke-linecap="strokeLinecap"
          :style="circlePathStyle"
        ></path>
      </svg>
    </div>
    <div 
      class="wl-progress__text"
      v-if="showText && !textInside"
      :style="{fontSize: progressTextSize + 'px'}"
    >
      <template v-if="!status">{{content}}</template>
      <i v-else :class="ionClass"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'WlProgress',
    props: {
      type: {
        type: String,
        default: 'line',
        validator: val => ['line', 'circle', 'dashboard'].indexOf(val) > -1
      },
      percentage: {
        type: Number,
        default: 0
      },
      strokeWidth: {
        type: Number,
        default: 8
      },
      color: {
        type: [String, Array, Function],
        default: ''
      },
      width: {
        type: Number,
        default: 126
      },
      showText: {
        type: Boolean,
        default: true
      },
      strokeLinecap: {
        type: String,
        default: 'round'
      },
      textInside: {
        type: Boolean,
        default: false
      },
      format: {
        type: Function
      },
      status: {
        type: String,
        validator: val => ['success', 'exception', 'warning'].indexOf(val) > -1
      }
    },
    computed: {
      barStyle() {
        const style = {};
        style.width = this.percentage + '%';
        style.backgroundColor = this.getCurrentColor(this.percentage);
        return style;
      },
      content() {
        if (typeof this.format === 'function') {
          return this.format(this.percentage) || '';
        } else {
          return this.percentage + '%';
        }
      },
      ionClass() {
        if (this.type === 'line') {
          if (this.status === 'success') {
            return 'wl-icon-CheckCircleOutline';
          } else if (this.status === 'exception') {
            return 'wl-icon-CloseCircleOutlined';
          } else if (this.status === 'warning') {
            return 'wl-icon-InformationCircleOutline';
          }
        } else {
          if (this.status === 'success') {
            return 'wl-icon-CheckOutline';
          } else if (this.status === 'exception') {
            return 'wl-icon-CloseOutlined';
          } else if (this.status === 'warning') {
            return 'wl-icon-InformationCircleOutline';
          }
        }
      },
      progressTextSize() {
        return this.type === 'line' ? 12 + this.strokeWidth * 0.4 : this.width * 0.111111 + 2;
      },
      // 获取画笔相对宽度，因为svg外层容器盒子宽高为126，svg自身为100，需要计算出以100为比例的画笔相对宽度
      relativeStrokeWidth() {
        return (this.strokeWidth / this.width * 100).toFixed(1);
      },
      perimeter() {
        return 2 * Math.PI * this.radius;
      },
      radius() {
        if (this.type === 'circle' || this.type === 'dashboard') {
          return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
        } else {
          return 0;
        }
      },
      trackPath() {
        const radius = this.radius;
        const isDashboard = this.type === 'dashboard';
        return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
        `;
      },
      rate() {
        return this.type === 'dashboard' ? 0.75 : 1;
      },
      strokeDashoffset() {
        const offset = -1 * this.perimeter * (1 - this.rate) / 2;
        return `${offset}px`;
      },
      trailPathStyle() {
        return {
          strokeDasharray: `${this.perimeter * this.rate}px, ${this.perimeter}px`,
          strokeDashoffset: this.strokeDashoffset
        };
      },
      circlePathStyle() {
        return {
          strokeDasharray: `${this.perimeter * this.rate * (this.percentage / 100)}px, ${this.perimeter}px`,
          strokeDashoffset: this.strokeDashoffset,
          transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
        };
      },
      stroke() {
        let ret;
        if (this.color) {
          ret = this.getCurrentColor(this.percentage);
        } else {
          switch (this.status) {
            case 'success':
              ret = '#13ce66';
              break;
            case 'exception':
              ret = '#ff4949';
              break;
            case 'warning':
              ret = '#e6a23c';
              break;
            default:
              ret = '#20a0ff';
          }
        }
        return ret;
      }
    },
    methods: {
      getCurrentColor(percentage) {
        if (typeof this.color === 'string') {
          return this.color;
        } else if (typeof this.color === 'function') {
          return this.color(percentage);
        } else {
          return this.getLevelColor(percentage);
        }
      },
      getLevelColor(percentage) {
        const colorArray = this.getColorArray().sort((a, b) => {a.percentage - b.percentage;});
        for (let i = 0; i < colorArray.length; i++) {
          if (colorArray[i].percentage > percentage) {
            return colorArray[i].color;
          }
        }
        return colorArray[colorArray.length - 1].color;
      },
      getColorArray() {
        const color = this.color;
        const span = 100 / color.length;
        return color.map((colorTemp, index) => {
          if (typeof colorTemp === 'string') {
            return {
              color: colorTemp,
              percentage: (index + 1) * span
            };
          }
          return colorTemp;
        });
      }
    }
  };
</script>