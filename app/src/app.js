import './styles/application.scss';
import $ from 'jquery';
import Editor from './editor/editor';

const editor = new Editor({
  el: $('#editor')
}).init();