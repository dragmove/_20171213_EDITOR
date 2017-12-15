import $ from 'jquery';

export default class Editor {
  constructor(options) {
    const _ = this;

    _._option = $.extend({
      el: null
    }, options);

    _.id = 0;

    _._modules = {};

    _._plugins = {};

    _.$el = $(_._option.el);

    _._htmlOriginal = '';
  }

  init(obj) {
    const _ = this;

    const elTagName = _.$el.prop('tagName');

    _._htmlOriginal = (_._htmlOriginal || _.$el.html());

    _._load(_._modules);
    _._load(_._plugins);
  }

  destroy(obj) {
    // TODO  
  }

  _load(obj) {
    // TODO
  }
}