import {
  getLabel,
  setLabel
} from '../CustomLabelUtil';

import UpdateLabelHandler from 'bpmn-js/lib/features/label-editing/cmd/UpdateLabelHandler';

export default function CustomUpdateLabelHandler(modeling) {
  UpdateLabelHandler.call(this, modeling);

  function setText(element, text) {
    // external label if present
    let label = element.label || element,
        labelTarget = element.labelTarget || element;

    setLabel(label, text, labelTarget !== label);

    return [ label, labelTarget ];
  }

  function execute(ctx) {
    ctx.oldLabel = getLabel(ctx.element);
    console.log("Old Label:-> " + ctx.oldLabel);
    console.log("New Label:-> " + ctx.newLabel);

    return setText(ctx.element, ctx.newLabel);
  }

  this.execute = execute;
}

CustomUpdateLabelHandler.$inject = [
  'modeling'
];
