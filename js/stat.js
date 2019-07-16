var CLOUD_START_POS = {
  x: 100,
  y: 50
};

var CLOUD_SHADOW_GAP = {
  x: 10,
  y: 10
};

var maxValue = function (arr) {
  if (arr.length == 0) {
    return undefined;
  }

  var maxElement = arr[0];
  for (i = 1; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.fillStyle = color;
  ctx.quadraticCurveTo(x, y + 220, x + 200, y + 240);
  ctx.quadraticCurveTo(x + 500, y + 240, x + 520, y + 100);
  ctx.quadraticCurveTo(x + 400, y - 30, x + 220, y - 40);
  ctx.quadraticCurveTo(x, y, x - 25, y - 25);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var renderColor = function (playerName) {
  var colorDiagram;
  if (playerName === 'Вы') {
    colorDiagram = 'rgba(255, 0, 0, 1)';
  } else {
    var saturation = Math.random(1) * 100;
    colorDiagram = 'hsl(250, ' + saturation + '%, 50%';
  }
  return colorDiagram;
};

var renderDiagram = function (ctx, data) {
  var PLAYER_NAME_GAP_Y = 20;
  var PLAYER_TIME_GAP_Y = 10;

  ctx.fillStyle = renderColor(data.text);
  ctx.fillRect(data.diagramX, data.diagramY, data.width, data.height);

  ctx.fillStyle = data.color;
  ctx.textAlign = 'center';
  ctx.fillText(data.text, data.diagramX +(data.width / 2), data.diagramY + PLAYER_NAME_GAP_Y);
  ctx.fillText(Math.round(data.times), data.diagramX +(data.width / 2), data.diagramY + data.height - PLAYER_TIME_GAP_Y);
};

var renderColumns = function (ctx, names, times) {
  var DIAGRAM_POS = {
    x: CLOUD_START_POS.x + 110,
    y: CLOUD_START_POS.y + 190
  };
  var DIAGRAM_WIDTH = 40;
  var DIAGRAM_MAX_HEIGHT = 150;
  var DIAGRAM_GAP = 50;

  var maxTime = maxValue(times);

  for (i = 0; i < names.length; i++) {
    var dataDiagram = {
      diagramX: DIAGRAM_POS.x + (DIAGRAM_WIDTH + DIAGRAM_GAP) * i,
      diagramY: DIAGRAM_POS.y,
      width: DIAGRAM_WIDTH,
      height: (-DIAGRAM_MAX_HEIGHT * times[i]) / maxTime,
      text: names[i],
      times: times[i],
      color: 'black',
    };
    renderDiagram(ctx, dataDiagram);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_START_POS.x + CLOUD_SHADOW_GAP.x, CLOUD_START_POS.y + CLOUD_SHADOW_GAP.y,'rgba(115, 115, 115, 0.7)' );
  renderCloud(ctx, CLOUD_START_POS.x, CLOUD_START_POS.y,'#fff' );

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUD_START_POS.x + 255, CLOUD_START_POS.y - 10);
  ctx.textAlign = 'center';
  ctx.fillText('Список результатов:', CLOUD_START_POS.x + 255, CLOUD_START_POS.y + 10);

  renderColumns(ctx, names, times);
}

