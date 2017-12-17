import './styles/application.scss';
import $ from 'jquery';
import Quill from 'quill';

$(function () {
  'use strict';

  // https://quilljs.com/docs/configuration/
  let options = {
    debug: true,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
      ]
    },
    placeholder: 'Compose an epic...',
    readOnly: false,
    scrollingContainer: null,
    strict: true,
    theme: 'snow'
  };

  const quill = new Quill('#editor', options);
});
