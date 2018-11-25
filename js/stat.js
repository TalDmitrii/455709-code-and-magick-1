'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var HISTOGRAM_HEIGHT = 150;
var MESSAGE_HEIGHT = 64;
var MESSAGE_GAP = 10;
var FONT_SIZE = 16;
var FONT_GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_X = CLOUD_X + BAR_GAP;
var ELEM_WIDTH = BAR_WIDTH + BAR_GAP;
var TIME_Y = MESSAGE_HEIGHT + (MESSAGE_GAP * 1) + (FONT_SIZE * 1);
var NAME_Y = MESSAGE_HEIGHT + (MESSAGE_GAP * 2) + (FONT_SIZE * 2) + HISTOGRAM_HEIGHT;
var SHADOW_X = CLOUD_X + SHADOW_GAP;
var SHADOW_Y = CLOUD_Y + SHADOW_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (array) {
  var maxElement = array[0];

  for (var i = 1; i < array.length; i++) {
    if (maxElement < array[i]) {
      maxElement = array[i];
    }
  }

  return maxElement;
};

var getRandomColor = function (minOpacity) {
  var color = Math.random() + minOpacity;

  return color;
};

var renderBar = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, value, x, y) {
  ctx.fillText(value, x, y);
};

var renderResults = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = (HISTOGRAM_HEIGHT * times[i]) / maxTime;
    var BAR_Y = MESSAGE_HEIGHT + (MESSAGE_GAP * 1) + (FONT_SIZE * 1) + FONT_GAP + (HISTOGRAM_HEIGHT - barHeight);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomColor(0.3) + ')';
    }

    renderBar(ctx, BAR_X + ELEM_WIDTH * i, BAR_Y, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    renderText(ctx, Math.round(times[i]), BAR_X + ELEM_WIDTH * i, TIME_Y);
    renderText(ctx, names[i], BAR_X + ELEM_WIDTH * i, NAME_Y);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  renderResults(ctx, names, times);
};
