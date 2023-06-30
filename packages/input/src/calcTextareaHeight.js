let hiddenTextarea;
const HIDDEN_STYLE = `
  height: 0 !important;
  visibility: hidden !imporant;
  overflow: hidden !important;
  position: absolute !important;
  zIndex: -1000 !important;
  top: 0 !important;
  right: 0 !important;
`;

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'font-family',
  'font-weight',
  'font-size',
  'width',
  'border-width',
  'text-rendering',
  'text-transform',
  'box-sizing',
  'text-indent'
];

function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue('box-sizing');
  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-top')) +
    parseFloat(style.getPropertyValue('padding-bottom'))
  );
  const borderSize = (
    parseFloat(style.getPropertyValue('border-top-width')) +
    parseFloat(style.getPropertyValue('border-bottom-width'))
  );
  const contextStyle = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';');
  return { contextStyle, paddingSize, borderSize, boxSizing };
}

export default function calcTextareaHeight(targetElement, minRows = 1, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.append(hiddenTextarea);
  }
  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetElement);

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    // content-box scrollHeight包含height+padding
    height = height - paddingSize;
  }

  hiddenTextarea.value = '';
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${ minHeight }px`;
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${ height }px`;
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
}
