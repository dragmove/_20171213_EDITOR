import './styles/application.scss';
import $ from 'jquery';
import Quill from 'quill';
import {namespace} from './util';

window.$ = $;

$(function () {
  'use strict';

  namespace('com.studiochocochip');

  com.studiochocochip.editor = (options) => {
    const option = $.extend({
      quill: null
    }, options);

    return new Quill('#editor', option.quill);
  };

  const editor = com.studiochocochip.editor({
    quill: {
      // https://quilljs.com/docs/configuration/
      debug: true,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

          // ['blockquote', 'code-block'],
          // [{'header': 1}, {'header': 2}],               // custom button values

          [{'list': 'ordered'}, {'list': 'bullet'}],

          // [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          // [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          // [{'direction': 'rtl'}],                         // text direction

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
          [{'header': [1, 2, 3, 4, 5, 6, false]}],

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'font': []}],
          [{'align': []}],

          ['clean']
        ]
      },
      placeholder: 'Compose an epic...',
      readOnly: false,
      scrollingContainer: null,
      strict: true,
      theme: 'snow'
    }
  });

  let nodes = {
    toolbar: null,
    bold: null,
    italic: null,
    underline: null,
    strike: null,

    undo: null,
    redo: null
  };

  // iOS
  window.setEditorCommand = (command = '') => {
    if (!nodes.toolbar) nodes.toolbar = document.querySelector('.ql-toolbar');

    switch (command) {
      case 'bold' :
        nodes.bold = nodes.bold || nodes.toolbar.querySelector('.ql-bold');
        $(nodes.bold).trigger('click');
        break;

      case 'italic' :
        nodes.italic = nodes.italic || nodes.toolbar.querySelector('.ql-italic');
        $(nodes.italic).trigger('click');
        break;

      case 'underline' :
        nodes.underline = nodes.underline || nodes.toolbar.querySelector('.ql-underline');
        $(nodes.underline).trigger('click');
        break;

      case 'strike' :
        nodes.strike = nodes.strike || nodes.toolbar.querySelector('.ql-strike');
        $(nodes.strike).trigger('click');
        break;

      case 'undo' :
        editor.history.undo();
        break;

      case 'redo' :
        editor.history.redo();
        break;

      case 'color' :
        // TODO
        // let colorBtns = nodes.toolbar.querySelectorAll('.ql-color .ql-primary');
        // $(colorBtns[colorBtns.length - 1]).trigger('click');
        break;
    }

    return command;
  };
});
