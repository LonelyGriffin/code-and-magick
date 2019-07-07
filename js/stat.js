var CLOUM_START_POS = {
  x: 100,
  y: 50
}

var CLOUM_SHADOW_GAP = {
  x: 10,
  y: 10
}

var maxValue = function (arr) {
  if (arr.length == 0) {
    console.log("Array is empty");
    return;
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
}

var renderColumns = function (ctx, names, times) {
  var DIAGRAM_POS = {
    x: CLOUM_START_POS.x + 110,
    y: CLOUM_START_POS.y + 190
  };
  var DIAGRAM_WIDTH = 40;
  var DIAGRAM_MAX_HEIGHT = 150;
  var DIAGRAM_GAP = 50;

  var PLAYER_NAME_GAP_Y = 20;
  var PLAYER_TIME_GAP_Y = 10;

  var maxTime = maxValue(times);

  for (i = 0; i < names.length; i++) {
    var diagramX = DIAGRAM_POS.x + (DIAGRAM_WIDTH + DIAGRAM_GAP) * i;
    var diagramY = DIAGRAM_POS.y;
    var columnHeight = (-DIAGRAM_MAX_HEIGHT * times[i]) / maxTime
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(times[i]), diagramX + (DIAGRAM_WIDTH / 2),DIAGRAM_POS.y + columnHeight - PLAYER_TIME_GAP_Y);
    ctx.fillText(names[i], diagramX + (DIAGRAM_WIDTH / 2), DIAGRAM_POS.y + PLAYER_NAME_GAP_Y);
    var saturation = Math.random(1) * 100;
    ctx.fillStyle = 'hsl(250, ' + saturation + '%, 50%';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(diagramX, diagramY, DIAGRAM_WIDTH, columnHeight);
  }
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUM_START_POS.x + CLOUM_SHADOW_GAP.x, CLOUM_START_POS.y + CLOUM_SHADOW_GAP.y,'rgba(115, 115, 115, 0.7)' );
  renderCloud(ctx, CLOUM_START_POS.x, CLOUM_START_POS.y,'#fff' );

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUM_START_POS.x + 255, CLOUM_START_POS.y - 10);
  ctx.textAlign = 'center';
  ctx.fillText('Список результатов:', CLOUM_START_POS.x + 255, CLOUM_START_POS.y + 10);

  renderColumns(ctx, names, times);
}
