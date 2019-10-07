(function (ctx) {
  window.colorize = (function (element, array) {
    element.addEventListener('click', function () {
      var color = ctx.random(array);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  })
})({
  random: window.utils.getRandomItem
});
