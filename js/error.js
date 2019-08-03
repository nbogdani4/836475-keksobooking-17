'use strict';

(function () {

  var main = document.querySelector('main');

  var onError = function (errorMessage) {
    var node = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    node.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(node);
  };

  window.error = {
    onError: onError,
  };

})();
