<template>
  <div 
  class="wl-slider" 
  :class="{
    'is-vertical': vertical
  }"
  ref="sliderBox">
    <!-- slider -->
    <div 
     class="wl-slider__runway" 
     :class="{
      'is-disabled': disabled
     }"
     :style =" height ? {
      height: height
     }: {}"
     @click.self="getMousePosition">
      <div 
      @click.self="getMousePosition"
      class="wl-slider__bar"
      :style="vertical ? {height: barWidth + '%'}: {width: barWidth + '%', top: 0 + '%'}">
      </div>
      <div 
      @mousedown="cricleClick"


      :style="vertical ?{top: barWidth + '%'}: {left: barWidth + '%'}"
      class="wl-slider__cricle-wrapper">
      <!-- @mousemove="getMousePosition" -->
      <!-- @mouseenter="moveCrile" -->

        <div
        class="wl-slider__cricle"
        ref="cricle"
        :class="{
          'grabbing': grabbing
        }">
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'WlSlider',
  data() {
    return {
      barWidth: this.value,
      startX: 0,
      startY: 0,
      pareWidth: 0,
      grabbing: false
    };
  },
  props: {
    value: {
      type: Number,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ''
    }
  },
  mounted() {
    //  获取父盒子的width
    this.$nextTick(() => {
      this.pareWidth = this.vertical ? this.$refs.sliderBox.offsetHeight : this.$refs.sliderBox.offsetWidth;
      console.log(this.$refs.sliderBox.offsetHeight, 'this.pareWidth', this.$refs.sliderBox.offsetLeft);
      this.startX = this.$refs.sliderBox.offsetLeft;
    });
    // 初始化的x轴位置、
    this.barWidth = this.value;
    console.log('监听鼠标');
    document.addEventListener('mousemove', function(e) {
      // console.log(e.pageX);
    });
    // 释放鼠标
    window.addEventListener('mouseup', this.cricleUp);
    window.addEventListener('mousemove', this.cricleMouseMove);
  },
  methods: {
    //  获取圆圈的起始点
    cricleClick() {
      console.log('?????');
      this.grabbing = true;
    },
    // 鼠标移动事件
    cricleMouseMove(e) {
      if (this.grabbing) {
        if (!this.disabled) {
          var bnoxOffLeft = this.$refs.sliderBox.getBoundingClientRect().left;
          var bnoxOffTop = this.$refs.sliderBox.getBoundingClientRect().top;
          this.barWidth = !this.vertical ? ((e.pageX - bnoxOffLeft) / this.$refs.sliderBox.offsetWidth) * 100 : (1 - ((e.pageY - bnoxOffTop) / this.$refs.sliderBox.offsetHeight)) * 100;
          this.barWidth = !this.vertical ? ((e.clientX - bnoxOffLeft) / this.$refs.sliderBox.offsetWidth) * 100 : ((1 - (e.clientY - bnoxOffTop) / this.$refs.sliderBox.offsetHeight)) * 100;
          if (this.barWidth < 0) {
            this.barWidth = 0;
          }
          if (this.barWidth >= 100) {
            this.barWidth = 100;
          }
          this.$emit('change', +this.barWidth.toFixed());
        }
      }
    },
    // 释放鼠标
    cricleUp() {
      console.log('释放鼠标');
      this.grabbing = false;
    },
    // 监听鼠标移动事件
    mouseOverEvent(e) {
      var event = event || window.event;
      console.log(event);
    },
    // 点击获取鼠标的位置
    getMousePosition(e) {
      console.log(e);
      if (!this.disabled) {
        this.barWidth = !this.vertical ? (e.offsetX / this.$refs.sliderBox.offsetWidth) * 100 : (e.offsetY / this.$refs.sliderBox.offsetHeight) * 100;
        console.log(e.pageY, this.$refs.sliderBox.offsetTop, this.barWidth, 'this.barWidth', this.pareWidth);
        if (this.barWidth < 0) {
          this.barWidth = 0;
        }
        this.$emit('change', +this.barWidth.toFixed());
      }
    },
    moveCrile(e) {
      console.log('11222', e);
      if (!this.disabled) {
        this.barWidth = !this.vertical ? (e.offsetX / this.$refs.sliderBox.offsetWidth) * 100 : (e.offsetY / this.$refs.sliderBox.offsetHeight) * 100;
        console.log(e.pageY, this.$refs.sliderBox.offsetTop, this.barWidth, 'this.barWidth', this.pareWidth);
        if (this.barWidth < 0) {
          this.barWidth = 0;
        }
        this.$emit('change', +this.barWidth.toFixed());
      }
    }
  }
};
</script>
