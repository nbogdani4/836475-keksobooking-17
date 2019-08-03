'use strict';

(function () {

  //  Создаем Дом-элемент Пина, с подготовленными местами для вставки данных с массива объекта
  var createPinElement = function (card) {
    var newPin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPinImg.src = card.author.avatar;
    newPinImg.alt = card.offer.type;
    newPin.style.left = card.location.x + 'px';
    newPin.style.top = card.location.y + 'px';

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

  // Рисуем метки на карте, при удачно полученных данных
  var onSuccess = function (data) {
    document.querySelector('.map__pins').appendChild(getPinsFragment(data));
    window.filter.activateFilter();
  };

  window.pins = {
    onSuccess: onSuccess,
  };

})();
