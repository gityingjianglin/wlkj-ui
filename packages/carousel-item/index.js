import WlCarouselItem from '../carousel/src/item';

/* istanbul ignore next */
WlCarouselItem.install = function(Vue) {
  Vue.component(WlCarouselItem.name, WlCarouselItem);
};

export default WlCarouselItem;
