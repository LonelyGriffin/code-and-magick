(function (ctx) {
  var URL_SEND = 'https://js.dump.academy/code-and-magick';

  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');
  var artShop = setup.querySelector('.setup-artifacts-shop');
  var inventory = setup.querySelector('.setup-artifacts');
  var form = setup.querySelector('.setup-wizard-form');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var draggedItem = null;

  artShop.addEventListener('dragstart', function (dragEvt) {
    if (dragEvt.target.localName === 'img') {
      draggedItem = dragEvt.target;
    }
  });

  inventory.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  inventory.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });

  inventory.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  inventory.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  var onSuccess = function(data){
    setup.classList.add('hidden');
  }

  var onError = function(message){
    console.error(message);
    setup.classList.add('hidden');
  }

  var saveWizardFormWithDebounce = ctx.debounce(function (form) {
    ctx.save(form, onSuccess, onError, URL_SEND);
  }, 300);

  function testing(evt) {
    evt.preventDefault();
    saveWizardFormWithDebounce(new FormData(form));
  };

  form.addEventListener('submit', testing);
})({
  save: window.backend.save,
  debounce: window.debounce
});
