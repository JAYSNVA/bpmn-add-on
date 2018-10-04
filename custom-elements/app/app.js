import pizzaDiagram from '../resources/pizza-collaboration.bpmn';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
//import camundaModdleDescriptor  from 'camunda-bpmn-moddle/resources/camunda';

//import resizeAllModule from 'bpmn-js-nyan/lib/resize-all-rules';
//import colorPickerModule from 'bpmn-js-nyan/lib/color-picker';
//import nyanDrawModule from 'bpmn-js-nyan/lib/nyan/draw';
//import nyanPaletteModule from 'bpmn-js-nyan/lib/nyan/palette';
//import visPalletteModule from 'bpmn-js-nyan/lib/vis-lib/palette';
//import visDrawModule from 'bpmn-js-nyan/lib/vis-lib/draw';

import customElements from './custom-elements.json';

import CustomModeler from './custom-modeler';

var modeler = new CustomModeler({
  container: '#canvas',
  keyboard: {
    bindTo: document
  },
  propertiesPanel: {
    parent: '#properties'
  },
  additionalModules: [
    //propertiesPanelModule,
    //propertiesProviderModule
    //resizeAllModule,
    //colorPickerModule,
    //nyanDrawModule,
    //nyanPaletteModule,
   // visPalletteModule,
    //visDrawModule
  ]
  /*moddleExtensions: {
    camunda: camundaModdleDescriptor
  }*/
});

modeler.importXML(pizzaDiagram, function(err) {

  if (err) {
    console.error('something went wrong:', err);
  }

  modeler.get('canvas').zoom('fit-viewport');

  modeler.addCustomElements(customElements);
});


// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;
