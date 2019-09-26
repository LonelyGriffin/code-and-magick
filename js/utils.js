window.utils = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscClick: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterClick: function (evt, action) {
      if (evt.keyCOde === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomItem: function (array) {
      return array[Math.floor(Math.random()* array.length)];
    }
  };
})();
