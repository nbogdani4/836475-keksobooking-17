'use strict';

(function () {

  var elementMap = document.querySelector('.map');
  var mainPin = elementMap.querySelector('.map__pin--main');
  var elementForm = document.querySelector('.ad-form');
  var adress = elementForm.querySelector('#address');
  var isDisabledMap = true;

  // Устанавливаем атрибут disabled переданному элементу
  var disableElement = function (element) {
    element.disabled = true;
  };

  // Удаляем атрибут disabled переданному элементу
  var enableElement = function (element) {
    element.disabled = false;
  };

  window.util = {
    elementMap: elementMap,
    mainPin: mainPin,
    elementForm: elementForm,
    adress: adress,
    isDisabledMap: isDisabledMap,
    disableElement: disableElement,
    enableElement: enableElement,
  };

})();

