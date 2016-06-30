'use strict';
/* global $ */

var slides = [
  {
    title: 'F'
  },
  {
    title: 'E'
  }
];

var svg;

var getCharPath = function(char, index) {
  return createPathFromGlyph(svg.querySelector('[unicode="' + char + '"]'), index, true);
};

var dPosition = 500;
var position = 0;

var createPathFromGlyph = function(glyph, index, animation) {
  var path = glyph.outerHTML.replace(
    '<glyph',
    '<path transform="scale(0.05, -0.05) translate(' + position + ', -1200)"'
  );

  if (animation) {
    console.log('bef', path);
    var destPath = svg.querySelector('[unicode="' + slides[1].title[index] + '"]');
    var d = destPath.getAttribute('d');
    path = path.replace('/>',
    '>' +
      '<animate dur="5s" repeatCount="indefinite" attributeName="d"' +
      'values="' + d + '">' +
    '</path>');
    console.log('aft', path);
  }
  position += dPosition;

  return path;
};


$.get('sample-font.svg').then(function(data) {

  svg = data;

  var body = $('body');

  var text = slides[0].title;
  var title = '';
  Array.prototype.forEach.call(text, function(letter, index) {
    title += getCharPath(letter, index);
  });

  var path = '<svg width="1300" height="1500">' + title + '</svg>';
  // svg.html(path);
  body.html(path);
});
