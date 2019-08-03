'use strict';

(function () {

  var housingToMinPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var formChildren = window.util.elementForm.querySelectorAll('fieldset');
  var price = window.util.elementForm.querySelector('#price');
  var typeHousing = window.util.elementForm.querySelector('#type');
  var timeIn = window.util.elementForm.querySelector('#timein');
  var timeOut = window.util.elementForm.querySelector('#timeout');

  // Активируем форму
  var activateForm = function () {
    window.util.elementForm.classList.remove('ad-form--disabled');
    formChildren.forEach(window.util.enableElement);
    onChangePrice();
    typeHousing.addEventListener('change', onChangePrice);
    timeIn.addEventListener('change', onSynchronizationTime);
    timeOut.addEventListener('change', onSynchronizationTime);
  };

  // Блокируем форму
  var disableForm = function () {
    window.util.elementForm.classList.add('ad-form--disabled');
    formChildren.forEach(window.util.disableElement);
    onChangePrice();
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
    disableForm: disableForm,
  };

})();
