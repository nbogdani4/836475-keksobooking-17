'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  //  Создаем Дом-элемент Пина, с подготовленными местами для вставки данных с массива объекта
  var createPinElement = function (card) {
    var newPin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPinImg.src = card.author.avatar;
    newPinImg.alt = card.offer.type;
    newPin.style.left = window.map.correctPinLocationX(card.location.x, PIN_WIDTH) + 'px';
    newPin.style.top = window.map.correctPinLocationY(card.location.y, PIN_HEIGHT) + 'px';
    return newPin;
  };


  //  Возвращаем сгенерированный Фрагмент с готовыми Пинами, собранными из шаблона и массива объектов
  var getPinsFragment = function (count) {
    var cards = window.data.genCardsData(count);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(createPinElement(cards[i]));
    }
    return fragment;
  };

  window.pin = {
    getPinsFragment: getPinsFragment,
  };

})();
