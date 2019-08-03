'use strict';

(function () {

  var Location = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var OriginalPosition = {
    X: 570,
    Y: 375
  };

  var moveToOriginalPosition = function () {
    window.util.mainPin.style.left = OriginalPosition.X + 'px';
    window.util.mainPin.style.top = OriginalPosition.Y + 'px';
  };

  // Ограничивает перемещение Пина по оси Х
  var setLimitMovementMainPinX = function (coordinateX) {
    if (coordinateX < Location.MIN_X) {
      coordinateX = Location.MIN_X;
    }
    if (coordinateX > Location.MAX_X - window.util.mainPin.offsetWidth) {
      coordinateX = Location.MAX_X - window.util.mainPin.offsetWidth;
    }
    return coordinateX;
  };

  // Ограничивает перемещение Пина по оси Y
  var setLimitMovementMainPinY = function (coordinateY) {
    if (coordinateY > Location.MAX_Y) {
      coordinateY = Location.MAX_Y;
    }
    if (coordinateY < Location.MIN_Y) {
      coordinateY = Location.MIN_Y;
    }
    return coordinateY;
  };

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.mainPin.style.left = setLimitMovementMainPinX(window.util.mainPin.offsetLeft - shift.x) + 'px';
      window.util.mainPin.style.top = setLimitMovementMainPinY(window.util.mainPin.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (window.util.isDisabledMap) {
        window.util.isDisabledMap = false;
        window.map.activateMap();
        window.form.activateForm();
      }

      window.util.elementMap.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    window.util.elementMap.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    moveToOriginalPosition: moveToOriginalPosition,
  };

})();
