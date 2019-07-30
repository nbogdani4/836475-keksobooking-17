'use strict';

(function () {
  URL = 'https://js.dump.academy/keksobooking/data';

  var load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();
  };

  load();
})();
