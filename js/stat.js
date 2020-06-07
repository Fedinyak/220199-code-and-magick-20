'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 120;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_FAMILY = '16px PT Mono';
var FONT_ALIGN = 'hanging';
var FONT_GAP = 15;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_VICTORY = 'Ура вы победили!';
var TEXT_STAT = 'Список результатов:';
var COLOR_CLOUD = '#fff';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.3)';
var COLOR_BLACK = '#000';
var COLOR_RED = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomSaturation = function () {
  return 'hsl(255, ' + getRandomNumber(100) + '%, 50%)';
};

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, COLOR_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_CLOUD);

  ctx.fillStyle = COLOR_BLACK;

  ctx.font = FONT_FAMILY;
  ctx.textBaseline = FONT_ALIGN;
  ctx.fillText(TEXT_VICTORY, CLOUD_X + 20, CLOUD_Y + 20);
  ctx.fillText(TEXT_STAT, CLOUD_X + 20, CLOUD_Y + 40);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(
        players[i],
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP
    );
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + GAP * 6 + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle =
      players[i] === 'Вы' ? COLOR_RED : getRandomSaturation();

    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y +
        BAR_GAP +
        GAP * 3 +
        (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime),
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) / maxTime
    );
  }
};
