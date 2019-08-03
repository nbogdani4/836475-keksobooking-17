'use strict';

(function () {

  var housingToMinPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var elementForm = document.querySelector('.ad-form');
  var formChildren = elementForm.querySelectorAll('fieldset');
  var price = elementForm.querySelector('#price');
  var typeHousing = elementForm.querySelector('#type');
  var timeIn = elementForm.querySelector('#timein');
  var timeOut = elementForm.querySelector('#timeout');

  // Активируем форму
  var activateForm = function () {
    elementForm.classList.remove('ad-form--disabled');
    formChildren.forEach(window.util.enableElement);
    onChangePrice();
    typeHousing.addEventListener('change', onChangePrice);
    timeIn.addEventListener('change', onSynchronizationTime);
    timeOut.addEventListener('change', onSynchronizationTime);
  };

  // Блокируем форму
  var disableForm = function () {
    elementForm.classList.add('ad-form--disabled');
    formChildren.forEach(window.util.disableElement);
    onChangePrice();
    window.mainPin.moveToOriginalPosition();
  };

  // Фукнция меняет минимальную цену, в зависимости от выбранного жилья
  var onChangePrice = function () {
    price.placeholder = housingToMinPrice[typeHousing.value];
    price.min = housingToMinPrice[typeHousing.value];
  };

  // Функция синхронизирует время заезда / выезда
  var onSynchronizationTime = function (evt) {
    if (evt.target.id === timeIn.id) {
      timeOut.value = timeIn.value;
      return;
    }
    timeIn.value = timeOut.value;
  };

  disableForm();

  window.form = {
    activateForm: activateForm,
    disableForm: disableForm
  };

})();
