import $ from 'jquery';
import Event from './modules/event';
import ToolBar from './modules/toolBar';
import Selection from './modules/selection';
import { getToolBarTpl, getTextEditorTpl } from './templates/tpl';

export default class AidEditor {
  constructor(options) {
    const _ = this;

    _._option = $.extend({
      el: null,
      toolBarBtns: ['bold', 'italic']
    }, options);

    _._commands = {
      bold: {
        title: 'bold',
        command: 'bold'
      },

      italic: {
        title: 'italic',
        command: 'italic'
      }
    };

    _._modules = {};

    _._plugins = {};

    _.id = 0;

    _.$el = null;

    _.$textEditorEl = null;

    _.event = Event.getInstance();
  }

  init(obj) {
    const _ = this;

    _.$el = $(_._option.el);

    _._setToolBar();
    _._setTextEditor();

    _.$textEditorEl = $('.text-editor', _.$el);

    _._modules = {
      // event: new Event({ $el: _.$textEditorEl }),
      
      toolBar: new ToolBar({
        $el: $('.tool-bar', _.$el),
        commands: _._commands
      }),

      selection: new Selection({
        $el: _.$textEditorEl
      })
    };
    _._load(_._modules);

    _._plugins = {};
    // TODO: _._load(_._plugins);
  }

  destroy(obj) {
    // TODO  
  }

  _setToolBar() {
    const _ = this;
    _.$el.append(getToolBarTpl());
  }

  _setTextEditor() {
    const _ = this;
    _.$el.append(getTextEditorTpl());
  }

  _load(obj = {}) {
    const _ = this;

    for (let key in obj) {
      obj[key].init();
    }
  }


}