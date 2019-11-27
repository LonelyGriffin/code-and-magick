'use strict';
(function (ctx) {
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupName = setup.querySelector('.setup-user-name');
var coatHidden = setup.querySelector('input[name="coat-color"]');
var eyesHidden = setup.querySelector('input[name="eyes-color"]');
var fireballHidden = setup.querySelector('input[name="fireball-color"]');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function(evt) {
 ctx.press(evt, closePopup);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  ctx.press(evt, openPopup);
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  ctx.press(evt, closePopup);
});
})({
  press: window.utils.isEnterClick
});
