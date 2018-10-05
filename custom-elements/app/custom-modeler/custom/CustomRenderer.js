import inherits from 'inherits';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import TextUtil from 'diagram-js/lib/util/Text';

import {
  getSemantic
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  componentsToPath,
  createLine
} from 'diagram-js/lib/util/RenderUtil';

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  classes as svgClasses
} from 'tiny-svg';

var LABEL_STYLE = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 12
};


/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(eventBus, styles) {

  BaseRenderer.call(this, eventBus, 2000);

  var textUtil = new TextUtil({
    style: LABEL_STYLE,
    size: { width: 100 }
  });

  var computeStyle = styles.computeStyle;

  function renderLabel(parentGfx, label, options) {
    var text = textUtil.createText(label || '', options);
    svgClasses(text).add('djs-label');
    svgAppend(parentGfx, text);

    return text;
  }

  function renderEmbeddedLabel(parentGfx, element, align) {
    var semantic = getSemantic(element);

    return renderLabel(parentGfx, semantic.name, {
      box: element,
      align: align,
      padding: 5,
      style: {
        fill: 'black'
      }
    });
  }

  /* Rectangle Created (Diktörtgen Oluşturma) Start */
  this.drawSquare = function(p, element) {
    var attrs, x, y;
    var width = element.width;
    var height = element.height;
    
    attrs = computeStyle(attrs, {
      stroke: '#000',
      strokeWidth: 2,
      fill: '#ffffff'
    });

    var rectangle = svgCreate('rect');

    svgAttr(rectangle, {
      width: width,
      height: height
    });

    svgAttr(rectangle, attrs);

    svgAppend(p, rectangle);

    renderEmbeddedLabel(p, element, 'center');

    return rectangle;
  };

  this.getSquarePath = function(element) {
    
    var x = element.x,
    y = element.y,
    width = element.width,
    height = element.height;

    var squarePath = [
      ['M', x + width / 2, y],
      ['l', width / 2, height],
      ['l', -width, 0 ],
      ['z']
    ];

    return componentsToPath(squarePath);
  };

  /* Rectangle (Square Create) End */

  /* SVG Line Created (BreadCrumb Create) Start*/

  this.drawArrow = function(p, element){
    var attrs;
    var width = element.width;
    var height = element.height;

    /*var line1_x1="2.60886", line1_y1="2.9258", line1_x2="122.02888",line1_y2="2.9258"; // line_1
    var line2_x1="2.60886", line2_y1="72.49086", line2_x2="122.02888",line2_y2="72.49086"; // line_2
    var line3_x1="2.89872", line3_y1="3.07073", line3_x2="27.82619", line3_y2="37.41848"; // line_3
    var line4_x1="27.52952", line4_y1="36.55211", line4_x2="3.05047", line4_y2="72.48768"; // line_4
    var line5_x1="121.15931", line5_y1="2.9258", line5_x2="146.08679", line5_y2="37.27356" // line_5  
    var line6_x1="122.14274", line6_y1="73.01181", line6_x2="145.9522", line6_y2="36.44048" //line_6*/

    //  3-5 kalkıcak
    // eklenicek (breakArrow)
    // line5_x1 = (width * 7) / 10, line5_y1 = height / 10, line5_x2 = (width * 7) / 10, line5_y2 = (height * 9) / 10,

    var line1_x1 = width / 10, line1_y1 = height / 10, line1_x2 = (width * 7) / 10, line1_y2 = height / 10,
    line2_x1 = width / 10, line2_y1 = height / 10, line2_x2 = (width * 3) / 10, line2_y2 = (height * 5) / 10,
    line3_x1 = (width * 7) / 10, line3_y1 = height / 10, line3_x2 = (width * 9) / 10, line3_y2 = height / 2,
    line4_x1 = (width * 7) / 10, line4_y1 = (height * 9) / 10, line4_x2 = width / 10, line4_y2 = (height * 9) / 10,
    line5_x1 = (width * 9) / 10, line5_y1 = (height * 5) / 10, line5_x2 = (width * 7) / 10, line5_y2 = (height * 9) / 10,
    line6_x1= (width * 1) / 10, line6_y1 = (height * 9) / 10, line6_x2 = (width * 3) / 10, line6_y2 = (height * 5) / 10;

    attrs = computeStyle(attrs, {
      stroke: '#821E1E',
      strokeWidth: 1.5,
      fill: '#ffffff'
    });
     
    var breadCrumb_line1 = svgCreate('line');
    svgAttr(breadCrumb_line1, {
      x1: line1_x1,
      y1: line1_y1,
      x2: line1_x2,
      y2: line1_y2
    });
    svgAttr(breadCrumb_line1, attrs);
    svgAppend(p, breadCrumb_line1);

    var breadCrumb_line2 = svgCreate('line');
    svgAttr(breadCrumb_line2, {
      x1: line2_x1,
      y1: line2_y1,
      x2: line2_x2,
      y2: line2_y2
    });
    svgAttr(breadCrumb_line2, attrs);
    svgAppend(p, breadCrumb_line2);

    var breadCrumb_line3 = svgCreate('line');
    svgAttr(breadCrumb_line3, {
      x1: line3_x1,
      y1: line3_y1,
      x2: line3_x2,
      y2: line3_y2
    });
    svgAttr(breadCrumb_line3, attrs);
    svgAppend(p, breadCrumb_line3);
    
    var breadCrumb_line4 = svgCreate('line');
    svgAttr(breadCrumb_line4, {
      x1: line4_x1,
      y1: line4_y1,
      x2: line4_x2,
      y2: line4_y2
    });
    svgAttr(breadCrumb_line4, attrs);
    svgAppend(p, breadCrumb_line4);

    var breadCrumb_line5 = svgCreate('line');
    svgAttr(breadCrumb_line5, {
      x1: line5_x1,
      y1: line5_y1,
      x2: line5_x2,
      y2: line5_y2
    });
    svgAttr(breadCrumb_line5, attrs);
    svgAppend(p, breadCrumb_line5);

    var breadCrumb_line6 = svgCreate('line');
    svgAttr(breadCrumb_line6, {
      x1: line6_x1,
      y1: line6_y1,
      x2: line6_x2,
      y2: line6_y2
    });
    svgAttr(breadCrumb_line6, attrs);
    svgAppend(p, breadCrumb_line6);

    renderEmbeddedLabel(p, element, 'center-middle');

    return breadCrumb_line1;
  };

  this.getArrowPath = function(element) {
    
    var x = element.x,
    y = element.y,
    width = element.width,
    height = element.height;

    var arrowPath = [
      ['M', x + width / 2, y],
      ['l', width / 2, height],
      ['l', -width, 0 ],
      ['z']
    ];

    return componentsToPath(arrowPath);
  };

  /* SVG Line Created (BreadCrumb Create) Start*/


  this.drawTriangle = function(p, side) {
    var halfSide = side.width / 2,
        points,
        attrs;

    points = [ halfSide, 0, side.width, side.width, 0, side.width ];

    attrs = computeStyle(attrs, {
      stroke: '#3CAA82',
      strokeWidth: 2,
      fill: '#3CAA82'
    });

    var polygon = svgCreate('polygon');

    svgAttr(polygon, {
      points: points
    });

    svgAttr(polygon, attrs);

    svgAppend(p, polygon);

    renderEmbeddedLabel(p, side, 'center-middle');

    return polygon;
  };

  this.getTrianglePath = function(element) {
    var x = element.x,
        y = element.y,
        width = element.width,
        height = element.height;

    var trianglePath = [
      ['M', x + width / 2, y],
      ['l', width / 2, height],
      ['l', -width, 0 ],
      ['z']
    ];

    return componentsToPath(trianglePath);
  };

  this.drawCircle = function(p, element) {
    var width = element.width;
    var height = element.height;

    var cx = width / 2,
        cy = height / 2;

    var attrs = computeStyle(attrs, {
      stroke: '#4488aa',
      strokeWidth: 4,
      fill: 'white'
    });

    var circle = svgCreate('circle');

    svgAttr(circle, {
      cx: cx,
      cy: cy,
      r: Math.round((width + height) / 4)
    });

    svgAttr(circle, attrs);

    svgAppend(p, circle);

    renderEmbeddedLabel(p, element, 'center-middle');

    return circle;
  };

  this.getCirclePath = function(shape) {
    var cx = shape.x + shape.width / 2,
        cy = shape.y + shape.height / 2,
        radius = shape.width / 2;

    var circlePath = [
      ['M', cx, cy],
      ['m', 0, -radius],
      ['a', radius, radius, 0, 1, 1, 0, 2 * radius],
      ['a', radius, radius, 0, 1, 1, 0, -2 * radius],
      ['z']
    ];

    return componentsToPath(circlePath);
  };

  this.drawCustomConnection = function(p, element) {
    var attrs = computeStyle(attrs, {
      stroke: '#ff471a',
      strokeWidth: 2
    });

    return svgAppend(p, createLine(element.waypoints, attrs));
  };

  this.getCustomConnectionPath = function(connection) {
    var waypoints = connection.waypoints.map(function(p) {
      return p.original || p;
    });

    var connectionPath = [
      ['M', waypoints[0].x, waypoints[0].y]
    ];

    waypoints.forEach(function(waypoint, index) {
      if (index !== 0) {
        connectionPath.push(['L', waypoint.x, waypoint.y]);
      }
    });

    return componentsToPath(connectionPath);
  };
}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = [ 'eventBus', 'styles' ];


CustomRenderer.prototype.canRender = function(element) {
  return /^custom:/.test(element.type);
};

CustomRenderer.prototype.drawShape = function(p, element) {
  var type = element.type;

  if (type === 'custom:triangle') {
    return this.drawTriangle(p, element);
  }

  if (type === 'custom:circle') {
    return this.drawCircle(p, element);
  }

  if (type === 'custom:square') {
    return this.drawSquare(p, element);
  }

  if (type === 'custom:arrow') {
    return this.drawArrow(p, element);
  }
};

CustomRenderer.prototype.getShapePath = function(shape) {
  var type = shape.type;

  if (type === 'custom:triangle') {
    return this.getTrianglePath(shape);
  }

  if (type === 'custom:circle') {
    return this.getCirclePath(shape);
  }

  if (type === 'custom:square') {
    return this.getSquarePath(shape);
  }

  if (type === 'custom:arrow') {
    return this.getArrowPath(shape);
  }
};

CustomRenderer.prototype.drawConnection = function(p, element) {

  var type = element.type;

  if (type === 'custom:connection') {
    return this.drawCustomConnection(p, element);
  }
};


CustomRenderer.prototype.getConnectionPath = function(connection) {

  var type = connection.type;

  if (type === 'custom:connection') {
    return this.getCustomConnectionPath(connection);
  }
};