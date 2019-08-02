'use strict';

(function () {

  var housingToMinPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var price = window.map.cardForm.querySelector('#price');
  var typeHousing = window.map.cardForm.querySelector('#type');
  var timeIn = window.map.cardForm.querySelector('#timein');
  var timeOut = window.map.cardForm.querySelector('#timeout');

  // Фукнция меняет минимальную цену, в зависимости от выбранного жилья
  var onChangePrice = function () {
      price.placeholder = housingToMinPrice[typeHousing.value];
      price.min = housingToMinPrice[typeHousing.value];
  };

  onChangePrice();
  typeHousing.addEventListener('change', onChangePrice);

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
