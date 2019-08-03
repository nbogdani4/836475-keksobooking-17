'use strict';

(function () {

  var elementMap = document.querySelector('.map');
  var mainPin = elementMap.querySelector('.map__pin--main');
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
    isDisabledMap: isDisabledMap,
    elementMap: elementMap,
    mainPin: mainPin,
    disableElement: disableElement,
    enableElement: enableElement,
  };

})();

