'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_MIN_X = 0;
var LOCATION_MAX_X = document.querySelector('.map').clientWidth;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var ADVERTISEMENTS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;

var cityMap = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapfilterForm = cityMap.querySelector('.map__filters');
var mapPinMain = cityMap.querySelector('.map__pin--main');
var inputPrice = adForm.querySelector('#price');
var selectTypeHousing = adForm.querySelector('#type');

// Фукнция меняет минимальную цену, в зависимости от выбранного жилья
var changeMinPrice = function () {
  var currenItemSelected = selectTypeHousing.value;
  if (currenItemSelected === 'bungalo') {
    inputPrice.placeholder = MIN_PRICE_BUNGALO;
    inputPrice.min = MIN_PRICE_BUNGALO;
  } else if (currenItemSelected === 'flat') {
    inputPrice.placeholder = MIN_PRICE_FLAT;
    inputPrice.min = MIN_PRICE_FLAT;
  } else if (currenItemSelected === 'house') {
    inputPrice.placeholder = MIN_PRICE_HOUSE;
    inputPrice.min = MIN_PRICE_HOUSE;
  } else if (currenItemSelected === 'palace') {
    inputPrice.placeholder = MIN_PRICE_PALACE;
    inputPrice.min = MIN_PRICE_PALACE;
  }
};

changeMinPrice();
selectTypeHousing.addEventListener('change', changeMinPrice);

var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');

// Функция синхронизирует время заезда /выезда
var synchronizationTimeFild = function () {
  if (event.target.id === selectTimeIn.id) {
    selectTimeOut.value = selectTimeIn.value;
    return;
  }
  selectTimeIn.value = selectTimeOut.value;
};

selectTimeIn.addEventListener('change', synchronizationTimeFild);
selectTimeOut.addEventListener('change', synchronizationTimeFild);

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

var pinMainLocationX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
var pinMainLocationY = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
var inputAdress = adForm.querySelector('#address');

inputAdress.value = pinMainLocationX + '.' + pinMainLocationY;

// Блокируем поля форм
addAttributeDisabled(adForm.children);
addAttributeDisabled(mapfilterForm.children);

var genRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomValue = function (arr) {
  var rand = genRandomRange(0, arr.length);
  return arr[rand];
};

//  Добавляет ведущий ноль, если число меньше двух знаков
var addLeadingZero = function (number) {
  return (number < 10 ? '0' : '') + number;
};

//  Корректирует положение Пина по оси Х исходя от его размера и не дает метке выпасть за пределы карты
var correctPinLocationX = function (locationX, pinWidth) {
  var correctLocation = locationX - (pinWidth / 2);
  if (locationX < (pinWidth / 2)) {
    correctLocation = 0;
  } else if (locationX > LOCATION_MAX_X - (pinWidth / 2)) {
    correctLocation = LOCATION_MAX_X - pinWidth;
  }
  return correctLocation;
};

//  Корректирует положение Пина по оси У, исходя от его высоты и не дает метке выпасть за пределы карты
var correctPinLocationY = function (locationY, pinHeight) {
  var correctLocation = locationY - pinHeight;
  if (correctLocation < LOCATION_MIN_Y) {
    correctLocation = LOCATION_MIN_Y;
  }
  return correctLocation;
};

//  Создает массив из 8 сгенерированных объектов со свойствами объявлений
var genDataObjectsArray = function (countDataObjects) {
  var advertisementsDataArr = [];
  for (var i = 1; i <= countDataObjects; i++) {
    advertisementsDataArr.push(
        {
          author: {
            avatar: 'img/avatars/user' + addLeadingZero(i) + '.png',
          },
          offer: {
            type: getRandomValue(OFFER_TYPE),
          },
          location: {
            x: genRandomRange(LOCATION_MIN_X, LOCATION_MAX_X),
            y: genRandomRange(LOCATION_MIN_Y, LOCATION_MAX_Y),
          }
        }
    );
  }
  return advertisementsDataArr;
};

//  Создаем Дом-элемент Пина, с подготовленными местами для вставки данных с массива объекта
var createPinElement = function (advertisementsData) {
  var newPin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  var newPinImg = newPin.querySelector('img');
  newPinImg.src = advertisementsData.author.avatar;
  newPinImg.alt = advertisementsData.offer.type;
  newPin.style.left = correctPinLocationX(advertisementsData.location.x, PIN_WIDTH) + 'px';
  newPin.style.top = correctPinLocationY(advertisementsData.location.y, PIN_HEIGHT) + 'px';
  return newPin;
};

//  Возвращаем сгенерированный Фрагмент с готовыми Пинами, собранными из шаблона и массива объектов
var getFragmentWithPins = function (valueLength) {
  var fragmentWithPins = document.createDocumentFragment();
  for (var i = 0; i < valueLength; i++) {
    fragmentWithPins.appendChild(createPinElement(advertisementsDataArray[i]));
  }
  return fragmentWithPins;
};

var advertisementsDataArray = genDataObjectsArray(ADVERTISEMENTS_COUNT);

// Ограничивает перемещение Пина по оси Х
var setLimitMovementMainPinX = function (mapPinMainCoordsX) {
  if (mapPinMainCoordsX < 0) {
    mapPinMainCoordsX = 0;
  }

  if (mapPinMainCoordsX > LOCATION_MAX_X - mapPinMain.offsetWidth) {
    mapPinMainCoordsX = LOCATION_MAX_X - mapPinMain.offsetWidth;
  }
  return mapPinMainCoordsX;
};

// Ограничивает перемещение Пина по оси Y
var setLimitMovementMainPinY = function (mapPinMainCoordsY) {
  if (mapPinMainCoordsY > LOCATION_MAX_Y) {
    mapPinMainCoordsY = LOCATION_MAX_Y;
  }

  if (mapPinMainCoordsY < LOCATION_MIN_Y) {
    mapPinMainCoordsY = LOCATION_MIN_Y;
  }
  return mapPinMainCoordsY;
};

// Возвращает координаты метки, в зависимости от атрибута функции (середина Пина или координаты, на которые метка указывает своим острым концом)
var mainPinReferencePoint = function (referencePoint) {
  var pinReferencePoint;

  if (referencePoint === 'center') {
    pinReferencePoint = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + '.' + Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
  }

  if (referencePoint === 'bottom') {
    pinReferencePoint = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + '.' + Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight);
  }
  return pinReferencePoint;
};

var isDisabledMap = true;
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var isMove = false;
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    isMove = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapPinMain.style.left = setLimitMovementMainPinX(mapPinMain.offsetLeft - shift.x) + 'px';
    mapPinMain.style.top = setLimitMovementMainPinY(mapPinMain.offsetTop - shift.y) + 'px';

    if (isDisabledMap === true) {
      inputAdress.value = mainPinReferencePoint('center');
    } else {
      inputAdress.value = mainPinReferencePoint('bottom');
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (isMove === true) {
      if (isDisabledMap === true) {
        isDisabledMap = false;
        inputAdress.value = mainPinReferencePoint('center');
        cityMap.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        delAttributeDisabled(adForm.children);
        delAttributeDisabled(mapfilterForm.children);
        document.querySelector('.map__pins').appendChild(getFragmentWithPins(advertisementsDataArray.length));
      } else {
        inputAdress.value = mainPinReferencePoint('bottom');
      }
    }

    cityMap.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  cityMap.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
