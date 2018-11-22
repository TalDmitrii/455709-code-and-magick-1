'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var HISTOGRAM_HEIGHT = 150;
var MESSAGE_HEIGHT = 54;
var MESSAGE_GAP = 10;
var FONT_SIZE = 16;
var FONT_GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (array) {
  var maxElement = array[0];

  for (var i = 1; i < array.length; i++) {
    if (maxElement < array[i]) {
      maxElement = array[i];
    };
  };

  return maxElement;
};

var renderResults = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = (HISTOGRAM_HEIGHT * times[i]) / maxTime;

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.3) + ')';
    };

    ctx.fillRect((CLOUD_X + BAR_GAP) + (BAR_WIDTH + BAR_GAP) * i, MESSAGE_HEIGHT + (MESSAGE_GAP * 1) + (FONT_SIZE * 1) + FONT_GAP + (HISTOGRAM_HEIGHT - barHeight), BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), (CLOUD_X + BAR_GAP) + (BAR_WIDTH + BAR_GAP) * i, MESSAGE_HEIGHT + (MESSAGE_GAP * 1) + (FONT_SIZE * 1));
    ctx.fillText(names[i], (CLOUD_X + BAR_GAP) + (BAR_WIDTH + BAR_GAP) * i, MESSAGE_HEIGHT + (MESSAGE_GAP * 2) + (FONT_SIZE * 2) + HISTOGRAM_HEIGHT);
  };
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  renderResults(ctx, names, times);
};
