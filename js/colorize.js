(function () {
  window.colorize = (function (element, array) {
    element.addEventListener('click', function () {
      var color = window.utils.getRandomItem(array);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  })
})();

