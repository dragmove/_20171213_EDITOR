import $ from 'jquery';
import Event from './event';

export default class Selection {
  constructor(options) {
    const _ = this;

    _._option = $.extend({
      $el: null
    }, options);

    _._$el = _._option.$el;

    _.event = Event.getInstance();
  }

  init(obj = null) {
    const _ = this;
    
    _.event.$on(_._$el, 'focus', function(evt) {
      // bulkRefresh

      console.log('focus');
    });

    _.event.$on(_._$el, 'contentChanged', function(evt) {
      console.log('oh');
    });
  }

  destroy(obj = null) {
    // TODO
  }
}