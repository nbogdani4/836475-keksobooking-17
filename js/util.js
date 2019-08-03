'use strict';

  window.util = (function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;

  var elementMap = document.querySelector('.map');
  var mainPin = elementMap.querySelector('.map__pin--main');
  var elementForm = document.querySelector('.ad-form');
  var adress = elementForm.querySelector('#address');
  var pinsArea = document.querySelector('.map__pins');
  var isDisabledMap = true;

  // Устанавливаем атрибут disabled переданному элементу
  var disableElement = function (element) {
    element.disabled = true;
  };

  // Удаляем атрибут disabled переданному элементу
  var enableElement = function (element) {
    element.disabled = false;
  };

    return {
      isEscEvent: function (evt, action) {
        if (evt.keyCode === ESC_KEYCODE) {
          action();
        }
      },
      isEnterEvent: function (evt, action) {
        if (evt.keyCode === ENTER_KEYCODE) {
          action();
        }
      },

      elementMap: elementMap,
      mainPin: mainPin,
      elementForm: elementForm,
      adress: adress,
      pinsArea: pinsArea,
      isDisabledMap: isDisabledMap,
      disableElement: disableElement,
      enableElement: enableElement,
    };
  })();
