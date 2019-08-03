'use strict';

(function () {

  // Активируем Карту
  var activateMap = function () {
    window.util.elementMap.classList.remove('map--faded');

  };

  // Блокируем карту
  var disableMap = function () {
    window.util.isDisabledMap = true;
    window.util.elementMap.classList.add('map--faded');
    window.mainPin.resetMainPinPosition();
    window.util.mainPin.addEventListener('keydown', window.mainPin.onMainPinEnterPress);
  };

  disableMap();

  window.map = {
    activateMap: activateMap,
    disableMap: disableMap
  };

})();
