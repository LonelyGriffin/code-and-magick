(function (ctx) {
  var WIZARDS_NUMBERS = 4;
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarSetup = document.querySelector('.setup-similar');
  similarSetup.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var addWizardsToSimilarList = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_NUMBERS; i++) {
      fragment.appendChild(renderWizard(ctx.random(wizards)));
    }
    similarListElement.appendChild(fragment);

  };

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

  ctx.load(addWizardsToSimilarList, errorHandler, URL_LOAD);
})({
    load: window.backend.load,
    random: window.utils.getRandomItem
  });
