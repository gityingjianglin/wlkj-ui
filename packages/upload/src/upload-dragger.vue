<template>
  <div
    class="wl-upload-dragger"
    :class="{
      'is-dragover': dragover
    }"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'WlUploadDrag',
    props: {
      disabled: Boolean
    },
    inject: {
      uploader: {
        default: ''
      }
    },
    data() {
      return {
        dragover: false
      };
    },
    methods: {
      onDragover() {
        if (!this.disabled) {
          this.dragover = true;
        }
      },
      onDrop(e) {
        if (this.disabled || !this.uploader) return;
        const accept = this.uploader.accept;
        this.dragover = false;
        if (!accept) {
          this.$emit('file', e.dataTransfer.files);
          return;
        }
        // e.dataTransfer.files 是一个fileList数组对象（类数组），所以用[].slice.call转化为真正的数组再做循环
        // 循环去除不符合this.uploader.accept要求的文件列表
        // $emit 触发组件 on-file事件，并且把选中文件列表当做参数传递到这个事件句柄
        this.$emit('file', [].slice.call(e.dataTransfer.files).filter(file => {
          const { type, name } = file;
          const extension = name.indexOf('.') > -1
            ? `.${ name.split('.').pop() }`
            : '';
          const baseType = type.replace(/\/.*$/, '');
          return accept.split(',')
            .map(type => type.trim())
            .filter(type => type)
            .some(acceptedType => {
              if (/\..+$/.test(acceptedType)) {
                // 匹配.exe, .word, .txt, .t
                return extension === acceptedType;
              }
              if (/\/\*$/.test(acceptedType)) {
                // 匹配abccc/*, a/*
                return baseType === acceptedType.replace(/\/\*$/, '');
              }
              if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
                // 匹配非  aaa/bb, a/b
                return type === acceptedType;
              }
              return false;
            });
        }));
      }
    }
  };
</script>

