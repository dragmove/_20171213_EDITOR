import $ from 'jquery';
import { isIOS, isAndroid } from '../../utils/util';

// singleton class file
const singleton = Symbol(),
  singletonEnforcer = Symbol();

export default class Event {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) throw new Error('can not construct singleton.');

    this._interactions = {
      down: 'mousedown',
      up: 'mouseup',
      move: 'mousemove'
    };

    this.init();
  }

  static getInstance() {
    if (!this[singleton]) this[singleton] = new Event(singletonEnforcer);
    return this[singleton];
  }

  init(obj = null) {
    this._setInteractionEventName();
  }

  _setInteractionEventName() {
    if (isIOS || isAndroid) {
      this._interactions = {
        down: 'touchstart',
        up: 'touchend',
        move: 'touchmove'
      };

    } else {
      this._interactions = {
        down: 'mousedown',
        up: 'mouseup',
        move: 'mousemove'
      };
    }
  }

  $on(target, eventName, callback, context) {
    $(target).on(eventName, callback);
  }

  destroy(obj = null) {
    // TODO
  }
}