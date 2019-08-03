'use strict';

(function () {

  var main = document.querySelector('main');

  // Функция удаляет сообщение об ошибке и сбрасывает окно в неактивное состояние
  var onCloseError = function () {
    window.form.disableForm();
    window.filter.disableFilter();
    window.map.disableMap();
    main.removeChild(main.querySelector('.error'));
    document.removeEventListener('click', onErrorMouseClick);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  // Функция проверяет клик мышки и вызывает функцию закрытия сообщения об ошибке
  var onErrorMouseClick = function (evt) {
    if ((evt.target.className === 'error') || (evt.target.className === 'error__button')) {
      onCloseError();
    }
  };

  // Функция проверяет правильная ли была нажата кнопка, и вызывает функцию закрытия сообщения об ошибке
  var onErrorEscPress = function (evt) {
    window.util.isEscEvent(evt, onCloseError);
  };

  // Функция генерирует шаблон ошибки
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
