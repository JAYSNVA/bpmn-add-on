import inherits from 'inherits';

import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider';

import {
  isAny
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {
  assign,
  bind
} from 'min-dash';


export default function CustomContextPadProvider(injector, connect, translate, elementFactory, config, contextPad) {

  injector.invoke(ContextPadProvider, this);

  config = config || {};
  
  if (config.autoPlace !== false) {
    this._autoPlace = injector.get('autoPlace', false);
  }

  var cached = bind(this.getContextPadEntries, this);

  this.getContextPadEntries = function(element) {
    var actions = cached(element);

    var businessObject = element.businessObject;

    function startConnect(event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    }

    function appendAction(type, className, title, options) {

      if (typeof title !== 'string') {
        options = title;
        title = translate('Append {type}', { type: type.replace(/^bpmn:/, '') });
      }
  
      function appendStart(event, element) {
  
        var shape = elementFactory.createShape(assign({ type: type }, options));
        create.start(event, shape, element);
      }
  
  
      var append = autoPlace ? function(event, element) {
        var shape = elementFactory.createShape(assign({ type: type }, options));
  
        autoPlace.append(element, shape);
      } : appendStart;
  
  
      return {
        group: 'model',
        className: className,
        title: title,
        action: {
          dragstart: appendStart,
          click: append
        }
      };
    }

    //Eğer gerekirse manuel connection oluşturulan yer
    if (isAny(businessObject, [ 'custom:triangle', 'custom:circle', 'custom:arrow', 'custom:square'])) {

      assign(actions, {
        'append.text-annotation': appendAction('bpmn:TextAnnotation', 'bpmn-icon-text-annotation'),
        
        'connect': {
          group: 'connect',
          className: 'bpmn-icon-connection-multi',
          title: translate('Connect using custom connection'),
          action: {
            click: startConnect,
            dragstart: startConnect
          }
        }
      });
    }

    return actions;
  };
}

inherits(CustomContextPadProvider, ContextPadProvider);

CustomContextPadProvider.$inject = [
  'injector',
  'connect',
  'translate',
  'elementFactory',
  'contextPad',
  'config.contextPad'
];
