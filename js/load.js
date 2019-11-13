'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT_TIME = 10000;

  window.load = function (url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        successHandler(xhr.response);
        window.photos = xhr.response;
      } else {
        errorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;

    xhr.open('GET', url);
    xhr.send();
  };
})();
