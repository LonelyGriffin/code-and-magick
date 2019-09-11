'use strict';
var WIZARDS_NUMBERS = 4;
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarSetup = document.querySelector('.setup-similar');
similarSetup.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomItem = function (array) {
  return array[Math.floor(Math.random()* array.length)];
};

var createWizards = function (quantity) {
  var wizards = [];
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  for (var i = 0; i < quantity; i++) {
    wizards[i] = {
      name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
      coatColor: getRandomItem(COAT_COLORS),
      eyesColor: getRandomItem(EYES_COLORS)
    };
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var addWizardsToSimilarList = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};
   
addWizardsToSimilarList(createWizards(WIZARDS_NUMBERS));


// Module 4
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupName = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');
var coatHidden = setup.querySelector('input[name="coat-color"]');
var eyesHidden = setup.querySelector('input[name="eyes-color"]');
var fireballHidden = setup.querySelector('input[name="fireball-color"]');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  fireball.addEventListener('click', onFireballClick);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', onCoatClick);
  wizardEyes.removeEventListener('click', onEyesClick);
  fireball.removeEventListener('click', onFireballClick);
};

var onCoatClick = function() {
  wizardCoat.style.fill = getRandomItem(COAT_COLORS);
  coatHidden.value = wizardCoat.style.fill;
};

var onEyesClick = function() {
  wizardEyes.style.fill = getRandomItem(EYES_COLORS);
  eyesHidden.value = wizardEyes.style.fill;
};

var onFireballClick = function() {
  fireballHidden.value = getRandomItem(FIREBALLS);
  fireball.style.backgroundColor = fireballHidden.value;
};

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keycode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keycode === ESC_KEYCODE) {
    closePopup();
  }
});
