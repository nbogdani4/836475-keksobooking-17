'use strict';

(function () {

  var MAX_PIN_COUNT = 5;

  //  Создаем Дом-элемент Пина, с подготовленными местами для вставки данных с массива объекта
  var createPinElement = function (card) {
    var newPin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPin.classList.add('map__pin--card');
    newPinImg.src = card.author.avatar;
    newPinImg.alt = card.offer.type;
    newPin.style.left = card.location.x + 'px';
    newPin.style.top = card.location.y + 'px';

    return newPin;
  };

  //  Возвращаем сгенерированный Фрагмент с готовыми Пинами, собранными из шаблона и массива объектов
  var getPinsFragment = function (data) {
    var fragment = document.createDocumentFragment();
    data = data.length > MAX_PIN_COUNT ? data.slice(0, MAX_PIN_COUNT) : data;
    data.forEach(function (it) {
      fragment.appendChild(createPinElement(it));
    });
    window.util.pinsArea.appendChild(fragment);
    window.filter.activateFilter();
  };

  // Рисуем метки на карте, при удачно полученных данных
  var onSuccess = function (data) {
    window.util.pins = data;
    getPinsFragment(data);
  };

  window.pins = {
    onSuccess: onSuccess,
    getPinsFragment: getPinsFragment,
  };

})();
