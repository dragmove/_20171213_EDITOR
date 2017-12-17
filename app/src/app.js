import './styles/application.scss';
import $ from 'jquery';
import AidEditor from './editor/aid-editor';

const editor = new AidEditor({
  el: $('#aid-editor'),
  toolBarBtns: ['bold', 'italic']
}).init();