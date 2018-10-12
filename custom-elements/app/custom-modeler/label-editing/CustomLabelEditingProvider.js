import {
  assign
} from 'min-dash';

import { getLabel } from './CustomLabelUtil';

import LabelEditingProvider from 'bpmn-js/lib/features/label-editing/LabelEditingProvider';

var SMALL_FONT_SIZE = 11,
    SMALL_LINE_HEIGHT = 13,
    MEDIUM_FONT_SIZE = 12,
    MEDIUM_LINE_HEIGHT = 14;

export default class CustomLabelEditingProvider extends LabelEditingProvider {
  constructor(eventBus, canvas, directEditing,
    modeling, resizeHandles) {

    // apply costructer class parents
    super(eventBus, canvas, directEditing,
      modeling, resizeHandles);

    let self = this;

    this.eventBus = eventBus;
    this.canvas = canvas;
    this.directEditing = directEditing;
    this.modeling = modeling;
    this.resizeHandles = resizeHandles;

    // listen to dblclick on non-root elements
    eventBus.on('element.dblclick', (event) => {
      self.activateDirectEdit(event.element, false);
    });
  }

  // permettre l'edition de l'etiquette en cliquant sur le concept
  activateDirectEdit(element, force) {
    if (force || /^custom/.test(element.type) || /^bpmn/.test(element.type))
    {
      //console.log('trying to edit');
      this.directEditing.activate(element);
    }
  }

  /**
   * Activate direct editing for activities and text annotations.
   *
   * @param  {djs.model.Base} element
   *
   * @return {Object} an object with properties bounds (position and size), text and options
   */
  activate(element) {
    /**
     * If the element is not an Custom element, we simply delegate the work
     * to the parent class.
     */
    /*if (!/^custom/.test(element.type)) {
      return super.activate(element);
    }*/

    // text
    var text = getLabel(element);

    if (text === undefined) {
      return;
    }

    var context = {
      text: text
    };

    // bounds
    var bounds = this.getEditingBBox(element);

    assign(context, bounds);

    // options
    var target = element.label || element;

    var options = {};

    // Risks, definit les propriétés du label à l'intérieur du concept
    /*if (/^custom/.test(element.type)) {
      assign(options, {
        centerVertically: true
      });
    }*/

    assign(context, {
      options: options
    });

    return context;
  }

  /**
   * Get the editing bounding box based on the element's size and position
   *
   * @param  {djs.model.Base} element
   *
   * @return {Object} an object containing information about position
   *                  and size (fixed or minimum and/or maximum)
   */
  getEditingBBox(element) {
    /**
     * If the element is not an IDSM element, we simply delegate the work
     * to the parent class.
     */
   /*if (!/^custom/.test(element.type) || !/^bpmn/.test(element.type)) {
      return super.getEditingBBox(element);
    }*/

    var canvas = this._canvas;

    var target = element.label || element;

    var bbox = canvas.getAbsoluteBBox(target);

    var mid = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };

    // default position
    var bounds = { x: bbox.x, y: bbox.y };

    var zoom = canvas.zoom();

    // take zoom into account
    var smallFontSize = SMALL_FONT_SIZE * zoom,
        smallLineHeight = SMALL_LINE_HEIGHT * zoom,
        mediumFontSize = MEDIUM_FONT_SIZE * zoom,
        mediumLineHeight = MEDIUM_LINE_HEIGHT * zoom;

    var style = {};

    // internal labels for tasks and collapsed call activities,
    // sub processes and participants
    // définit le comportement de base du concept ajouté en paramétre
    if (/^custom/.test(element.type) || /^bpmn/.test(element.type)) { // bpmn

      assign(bounds, {
        width: bbox.width,
        height: bbox.height
      });

      assign(style, {
        fontSize: mediumFontSize + 'px',
        lineHeight: mediumLineHeight + 'px',
        paddingTop: (7 * zoom) + 'px',
        paddingBottom: (7 * zoom) + 'px',
        paddingLeft: (5 * zoom) + 'px',
        paddingRight: (5 * zoom) + 'px'
      });
    }

    return { bounds: bounds, style: style };
  }

  update (element, newLabel,
    activateContextText, bounds) {
    /**
     * If the element is not an IDSM element, we simply delegate the work
     * to the parent class.
     */
    /*if (!/^custom/.test(element.type)) {
      return super.update(element, newLabel,
        activateContextText, bounds);
    }*/

    var newBounds,
    bbox;

    if (/^custom:/.test(element.type) || /^bpmn/.test(element.type)) {
      bbox = this._canvas.getAbsoluteBBox(element);

      newBounds = {
        x: element.x,
        y: element.y,
        width: element.width / bbox.width * bounds.width,
        height: element.height / bbox.height * bounds.height
      };
    }

    this._modeling.updateCustomLabel(element, newLabel, newBounds);
  }
};

LabelEditingProvider.$inject = [
  'eventBus',
  'canvas',
  'directEditing',
  'modeling',
  'resizeHandles'
];
