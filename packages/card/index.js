import WlCard from './src/main';

/* istanbul ignore next */
WlCard.install = function(Vue) {
  Vue.component(WlCard.name, WlCard);
};

export default WlCard;
