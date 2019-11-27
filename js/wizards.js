(function (params) {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';

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
  };

  var getRank = function(wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var updateWizards = function() {
    window.render(savedWizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = savedWizards.indexOf(left) - savedWizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var handler = function(data) {
    savedWizards = data;
    updateWizards();
  };

  window.wizard.onEyesChange = params.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  }, 300);

  window.wizard.onCoatChange = params.debounce(function (color) {
    coatColor = color;
    updateWizards();
  }, 300);

  params.load(handler, errorHandler, URL_LOAD);
})({
    colorize: window.colorize,
    load: window.backend.load,
    random: window.utils.getRandomItem,
    debounce: window.debounce
  });
