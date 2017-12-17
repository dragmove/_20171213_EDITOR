export const getToolBarTpl = () => {
  return `<div class="tool-bar"></div>`;
};

export const getToolBarBtnTpl = (cmd = {title, command}) => {
  return `<button type="button" class="btn-${cmd.title}" data-command="${cmd.command}">${cmd.title}</button>`;
};

export const getTextEditorTpl = () => {
  return `<div class="text-editor" contenteditable="true"></div>`;
};

