'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var main = document.querySelector('main');

  var closeError = function () {
    main.removeChild(main.querySelector('.error'));
    document.removeEventListener ('click', onErrorMouseClick);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorMouseClick = function (evt) {
    if ((evt.target.className === 'error') || (evt.target.className === 'error__button')) {
      closeError();
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeError();
    }
  };

  var onError = function (errorMessage) {
    var node = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    node.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(node);

    document.addEventListener('click', onErrorMouseClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  window.error = {
    onError: onError,
  };

})();
