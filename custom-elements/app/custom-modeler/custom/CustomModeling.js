import Modeling from 'bpmn-js/lib/features/modeling/Modeling';

import CustomUpdateLabelHandler from '../label-editing/cmd/CustomUpdateLabelHandler';

export default class CustomModeling extends Modeling {
  constructor(eventBus, elementFactory, commandStack,
    bpmnRules) {
    super(eventBus, elementFactory, commandStack, bpmnRules);
  }

  getHandlers() {
    let handlers = super.getHandlers();

    handlers['element.updateCustomLabel'] = CustomUpdateLabelHandler;

    return handlers;
  }

  updateCustomLabel(element, newLabel, newBounds) {
    console.log(newLabel);
    this._commandStack.execute('element.updateCustomLabel', {
      element: element,
      newLabel: newLabel,
      newBounds: newBounds
    });
  }
};

CustomModeling.$inject = [
  'eventBus',
  'elementFactory',
  'commandStack',
  'bpmnRules'
];
