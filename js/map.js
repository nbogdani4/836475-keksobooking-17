'use strict';

(function () {

  var deletePins = function () {
    var pins = window.util.elementMap.querySelectorAll('.map__pin--card');
    pins.forEach(function (pin) {
      window.util.pinsArea.removeChild(pin);
    });
  };

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
    deletePins();
  };

  disableMap();

  window.map = {
    activateMap: activateMap,
    disableMap: disableMap,
    deletePins: deletePins
  };

})();
