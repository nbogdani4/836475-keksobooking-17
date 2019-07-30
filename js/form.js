'use strict';

(function () {

  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var price = window.map.cardForm.querySelector('#price');
  var typeHousing = window.map.cardForm.querySelector('#type');
  // Фукнция меняет минимальную цену, в зависимости от выбранного жилья
  var onChangePrice = function () {
    var currenItemSelected = typeHousing.value;
    if (currenItemSelected === 'bungalo') {
      price.placeholder = MIN_PRICE_BUNGALO;
      price.min = MIN_PRICE_BUNGALO;
    } else if (currenItemSelected === 'flat') {
      price.placeholder = MIN_PRICE_FLAT;
      price.min = MIN_PRICE_FLAT;
    } else if (currenItemSelected === 'house') {
      price.placeholder = MIN_PRICE_HOUSE;
      price.min = MIN_PRICE_HOUSE;
    } else if (currenItemSelected === 'palace') {
      price.placeholder = MIN_PRICE_PALACE;
      price.min = MIN_PRICE_PALACE;
    }
  };

  onChangePrice();
  typeHousing.addEventListener('change', onChangePrice);

  var timeIn = window.map.cardForm.querySelector('#timein');
  var timeOut = window.map.cardForm.querySelector('#timeout');

  // Функция синхронизирует время заезда / выезда
  var onSynchronizationTime = function (evt) {
    if (evt.target.id === timeIn.id) {
      timeOut.value = timeIn.value;
      return;
    }
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onSynchronizationTime);
  timeOut.addEventListener('change', onSynchronizationTime);

  // Функция добавляет атрибут disabled к тегам fieldset и select из переданного массива
  var addAttributeDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      if ((array[i].tagName.toLowerCase() === 'fieldset') || (array[i].tagName.toLowerCase() === 'select')) {
        array[i].disabled = true;
      }
    }
  };

  // Функция удаляет атрибут disabled у любых тегов (если он есть) из переданного массива
  var delAttributeDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].disabled) {
        array[i].disabled = false;
      }
    }
  };

  var mainPinLocationX = Math.floor(window.map.mainPin.offsetLeft + window.map.mainPin.offsetWidth / 2);
  var mainPinLocationY = Math.floor(window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight / 2);
  var inputAdress = window.map.cardForm.querySelector('#address');

  inputAdress.value = mainPinLocationX + '.' + mainPinLocationY;

  // Блокируем поля форм
  addAttributeDisabled(window.map.cardForm.children);
  addAttributeDisabled(window.map.filterForm.children);


  window.form = {
    inputAdress: inputAdress,
    delAttributeDisabled: delAttributeDisabled,
  };

})();
