'use strict';
/* global $ */

var slides = [
  {
    title: 'F'
  },
  {
    title: 'A'
  }
];

var getCharPath = function(svg, char) {
  return createPathFromGlyph(svg.querySelector('[unicode="' + char + '"]'));
};

var createPathFromGlyph = function(glyph) {
  return glyph.outerHTML.replace(
    '<glyph',
    '<path transform="scale(0.05, -0.05) translate(0, -1200)"'
  );
};

var glyph;
$.get('sample-font.svg').then(function(data) {
  glyph = data.querySelector('glyph');

  var body = $('body');

  var text = slides[0].title;
  var path = '<svg width="1300" height="1500">' + getCharPath(data, text) + '</svg>';
  // svg.html(path);
  body.html(path);
});
