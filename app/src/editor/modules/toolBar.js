import $ from 'jquery';
import { getToolBarBtnTpl } from '../templates/tpl';
import Event from '../modules/event';

export default class ToolBar {
  constructor(options) {
    const _ = this;

    _._option = $.extend({
      $el: null,
      commands: {
        bold: null,
        italic: null
      }
    }, options);

    _._$el = _._option.$el;

    _._commands = _._option.commands;

    _.event = Event.getInstance();
  }

  init(obj = null) {
    const _ = this;

    _._setBtns();
  }

  _setBtns() {
    const _ = this,
      cmds = _._commands;

    let btn;
    for (const key in cmds) {
      btn = $(getToolBarBtnTpl(cmds[key]));
      _._$el.append(btn);

      _.event.$on(btn, 'click', function(evt) {
        evt.preventDefault();
        document.execCommand($(this).attr('data-command'), false, null);
      });
    }
  }

  destroy(obj = null) {
    // TODO
  }
}