(function () {
  var STATUS_OK = 200;
  var STATUS_NOT_FOUND = 404;
  var TIMEOUT = 10000;

  var xhrHandler = function( onLoad, onError, URL, requestType, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case STATUS_OK:
          onLoad(xhr.response);
          break;
        case STATUS_NOT_FOUND:
          location.href = 'https://up.htmlacademy.ru/404'; //тут должно было быть что то офигенное, но пока что так :D
          break;
        default:
          onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(requestType, URL);
    switch (requestType) {
      case 'POST':
        xhr.send(data);
        break;
      case 'GET':
        xhr.send();
        break;
      default:
        onError('Неправильный тип запроса');
    }
  };

  window.backend = {
    load: function (onLoad, onError, URL) {
      xhrHandler(onLoad, onError, URL, 'GET');
    },
    save: function (data, onLoad, onError, URL) {
      xhrHandler(onLoad, onError, URL, 'POST', data);
    }
  };
})();
