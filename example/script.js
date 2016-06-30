'use strict';
/* global $ */

var slides = [
  {
    title: 'Foo'
  },
  {
    title: 'Bar'
  }
];

var getCharPath = function(svg, char) {
  return createPathFromGlyph(svg.querySelector('[unicode="' + char + '"]'));
};

var dPosition = 500;
var position = -dPosition;

var createPathFromGlyph = function(glyph) {
  position += dPosition;

  return glyph.outerHTML.replace(
    '<glyph',
    '<path transform="scale(0.05, -0.05) translate(' + position + ', -1200)"'
  );
};

var glyph;
$.get('sample-font.svg').then(function(data) {
  glyph = data.querySelector('glyph');

  var body = $('body');

  var text = slides[0].title;
  var title = '';
  Array.prototype.forEach.call(text, function(letter) {
    title += getCharPath(data, letter);
  });

  var path = '<svg width="1300" height="1500">' + title + '</svg>';
  // svg.html(path);
  body.html(path);
});
