import CustomElementFactory from './CustomElementFactory';
import CustomRenderer from './CustomRenderer';
import CustomPalette from './CustomPalette';
import CustomRules from './CustomRules';
import CustomUpdater from './CustomUpdater';
import CustomContextPadProvider from './CustomContextPadProvider';
import CustomModeling from './CustomModeling';
import ModelingModule from 'bpmn-js/lib/features/modeling';

export default {
  __init__: [
    'customRenderer',
    'paletteProvider',
    'customRules',
    'customUpdater',
    'contextPadProvider',
    'modeling'
  ],
  __depends__: [
    ModelingModule
  ],
  elementFactory: [ 'type', CustomElementFactory ],
  customRenderer: [ 'type', CustomRenderer ],
  paletteProvider: [ 'type', CustomPalette ],
  customRules: [ 'type', CustomRules ],
  customUpdater: [ 'type', CustomUpdater ],
  contextPadProvider: [ 'type', CustomContextPadProvider ],
  modeling: ['type', CustomModeling]

};



