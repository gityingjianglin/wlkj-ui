<template>
  <transition-group
    tag="ul"
    :class="[
      'wl-upload-list',
      'wl-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="wl-list"
  >
    <li
      v-for="file in files"
      :class="['wl-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          class="wl-upload-list__item-thumbnail"
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
          :src="file.url" alt=""
        >
        <a class="wl-upload-list__item-name" @click="handleClick(file)">
          <i class="wl-icon-CalendarOutline"></i>{{file.name}}
        </a>
        <label class="wl-upload-list__item-status-label">
          <i :class="{
            'wl-icon-CheckCircleOutline': true,
            'wl-icon-circle-check': listType === 'text',
            'wl-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
          }"></i>
        </label>
        <i class="wl-icon-CloseOutlined" v-if="!disabled" @click="$emit('remove', file)"></i>
        <i class="wl-icon-CloseOutlined-tip" v-if="!disabled">{{ t('el.upload.deleteTip') }}</i> <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <wl-progress
          v-if="file.status === 'uploading'"
          :type="listType === 'picture-card' ? 'circle' : 'line'"
          :stroke-width="listType === 'picture-card' ? 6 : 2"
          :percentage="parsePercentage(file.percentage)">
        </wl-progress>
        <span class="wl-upload-list__item-actions" v-if="listType === 'picture-card'">
          <span
            class="wl-upload-list__item-preview"
            v-if="handlePreview && listType === 'picture-card'"
            @click="handlePreview(file)"
          >
            <i class="wl-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="wl-upload-list__item-delete"
            @click="$emit('remove', file)"
          >
            <i class="wl-icon-delete"></i>
          </span>
        </span>
      </slot>
    </li>
  </transition-group>
</template>
<script>
  import Locale from 'wlkj-ui/src/mixins/locale';
  import WlProgress from 'wlkj-ui/packages/progress';

  export default {

    name: 'WlUploadList',

    mixins: [Locale],

    data() {
      return {
        focusing: false
      };
    },
    components: { WlProgress },

    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: Function,
      listType: String
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      }
    }
  };
</script>
