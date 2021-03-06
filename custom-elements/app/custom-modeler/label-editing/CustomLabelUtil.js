import { is } from 'bpmn-js/lib/util/ModelUtil';

function getLabelAttr(semantic) {
  if (is(semantic, 'custom:arrow') ||
      is(semantic, 'custom:square') ||
      is(semantic, 'custom:triangle') || 
      is(semantic, 'custom:circle')) {
    return 'name';
  }

  if (is(semantic, 'bpmn:TextAnnotation')) {
    return 'text';
  }    

  //return 'text';
}

export function getLabel(element) {
  let semantic = element.businessObject,
      attr = getLabelAttr(semantic);

  if (attr) {
    return semantic[attr] || '';
  }
}

export function setLabel(element, text, isExternal) {
  var semantic = element.businessObject,
      attr = getLabelAttr(semantic);

  if (attr) {
    semantic[attr] = text;
  }

  // show external label if not empty
  if (isExternal) {
    element.hidden = !text;
  }

  return element;
}
