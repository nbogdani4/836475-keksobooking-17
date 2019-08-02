'use strict';

(function () {

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  //  Создаем Дом-элемент Пина, с подготовленными местами для вставки данных с массива объекта
  var createPinElement = function (card) {
    var newPin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPinImg.src = card.author.avatar;
    newPinImg.alt = card.offer.type;
    newPin.style.left = window.map.correctPinLocationX(card.location.x, Pin.WIDTH) + 'px';
    newPin.style.top = window.map.correctPinLocationY(card.location.y, Pin.HEIGHT) + 'px';
    return newPin;
  };

  //  Возвращаем сгенерированный Фрагмент с готовыми Пинами, собранными из шаблона и массива объектов
  var getPinsFragment = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (value) {
      fragment.appendChild(createPinElement(value));
    });
    return fragment;
  };

  window.pin = {
    getPinsFragment: getPinsFragment,
  };

})();
