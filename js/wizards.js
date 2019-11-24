(function (params) {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';

  var setup = document.querySelector('.setup');
  setup.classList.remove('hidden')
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');

  var coatColor;
  var eyesColor;
  var savedWizards = [];

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '33px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }


  var getRank = function(wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  var updateWizards = function() {
    window.render(savedWizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = savedWizards.indexOf(left) - savedWizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  // var updateWizards = function() {
  //   var sameCoatAndEyesWizards = savedWizards.filter(function (it) {
  //     return it.colorCoat === coatColor &&
  //       it.colorEyes === eyesColor;
  //   });
  //
  //   var sameCoatWizards = savedWizards.filter(function (it) {
  //       return it.colorCoat === coatColor;
  //   });
  //   var sameEyesWizards = savedWizards.filter(function (it) {
  //     return it.colorEyes === eyesColor;
  //   });
  //
  //   var filteredWizards = sameCoatAndEyesWizards;
  //   filteredWizards = filteredWizards.concat(sameCoatWizards);
  //   filteredWizards = filteredWizards.concat(sameEyesWizards);
  //   filteredWizards = filteredWizards.concat(savedWizards);
  //
  //   var uniqueWizards = filteredWizards.filter(function (it, i)  {
  //     return filteredWizards.indexOf(it) === i;
  //   });
  //
  //   window.render(uniqueWizards);
  // };
  // var colorWizard = {
  //   onEyesChange: window.colorize(wizardCoat, COAT_COLORS);
  //   onEyesChange: window.colorize(wizardEyes, EYES_COLORS);
  //   onFireBallChange: window.colorize(fireball, FIREBALLS);
  // }

  var handler = function(data) {
    savedWizards = data;
    updateWizards();
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
   // console.log(eyesColor);
    updateWizards();
  }

  //console.log(wizard.onEyesChange);

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    updateWizards();
  }

  //
  //
  // var changeEyes = function() {
  //   eyesColor = window.colorize(wizardEyes, EYES_COLORS);
  //   console.log(eyesColor);
  //   updateWizards();
  // }
  //
  // var changeColor = function() {
  //   coatColor = window.colorize(wizardCoat, COAT_COLORS);
  //   updateWizards();
  // }
  // console.log(changeEyes());
  params.load(handler, errorHandler, URL_LOAD);
})({
    colorize: window.colorize,
    load: window.backend.load,
    random: window.utils.getRandomItem
  });
