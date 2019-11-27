(function (params) {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  }

  var wizardElement = document.querySelector('.setup-wizard');
  wizardElement.classList.remove('hidden');

  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  wizardCoatElement.addEventListener('click', function () {
    var newColor = params.random(COAT_COLORS);
    wizardCoatElement.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  wizardEyesElement.addEventListener('click', function () {
    var newColor = params.random(EYES_COLORS);
    wizardEyesElement.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  var wizardFireBallElement = document.querySelector('.setup-fireball-wrap');
  wizardFireBallElement.addEventListener('click', function () {
    var newColor = params.random(FIREBALLS);
    wizardFireBallElement.style.backgroundColor = newColor;
  });

  return window.wizard = wizard;
})({
  random: window.utils.getRandomItem
  });
