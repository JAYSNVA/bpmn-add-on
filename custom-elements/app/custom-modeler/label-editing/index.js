import DirectEditingModule from 'diagram-js-direct-editing';

import CustomLabelEditingProvider from './CustomLabelEditingProvider';

export default {
  __depends__: [
    DirectEditingModule
  ],
  __init__: [
    'labelEditingProvider',
  ],
  labelEditingProvider: [ 'type', CustomLabelEditingProvider ],
};
