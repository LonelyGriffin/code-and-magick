(function (ctx) {
  var URL_SEND = 'https://js.dump.academy/code-and-magick';

  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');
  var artShop = setup.querySelector('.setup-artifacts-shop');
  var inventory = setup.querySelector('.setup-artifacts');
  var form = setup.querySelector('.setup-wizard-form');

  //var debounce = require('lodash.debounce');

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

  // function debounce(func, wait, immediate) {
  //     var timeout;
  //     return function() {
  //       var context = this, args = arguments;
  //       var later = function() {
  //         timeout = null;
  //         if (!immediate) func.apply(context, args);
  //       };
  //       var callNow = immediate && !timeout;
  //       clearTimeout(timeout);
  //       timeout = setTimeout(later, wait);
  //       if (callNow) func.apply(context, args);
  //     };
  //   };

  function testing(evt) {
    //debugger;
    evt.preventDefault();
    ctx.save(new FormData(form), onSuccess, onError, URL_SEND), 950);
    evt.stopPropagation();
  };

  //var dep = window.debounce(testing, 150);
  form.addEventListener('submit', window.debounce(testing, 950));
  //form.addEventListener('submit', dep, true);
  //console.log(window.debounce);
})({
  save: window.backend.save,
  //debounce: window.debounce
});
