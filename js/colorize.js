(function (ctx) {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup-wizard');
  setup.classList.remove('hidden')
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  }

  // window.colorize(wizardCoat, COAT_COLORS);
  // window.colorize(wizardEyes, EYES_COLORS);
  // window.colorize(fireball, FIREBALLS);
//console.log(wizard);


  var colorize = (function (element, array) {
    element.addEventListener('click', function () {
      var color = ctx.random(array);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
         // console.log(color);
        // wizard.onCoatChange(color);
        // wizard.onEyesChange(color);
      }
    });
  });
  //console.log(colorize(wizardEyes, EYES_COLORS));
  wizard.onEyesChange(colorize(wizardEyes, EYES_COLORS));
  wizard.onCoatChange(colorize(wizardCoat, COAT_COLORS));
  console.log(wizard.onEyesChange);
  return window.wizard = wizard;
})({
  random: window.utils.getRandomItem
});
