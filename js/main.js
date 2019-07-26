'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_MIN_X = 0;
var LOCATION_MAX_X = 1200;
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
var cardForm = document.querySelector('.ad-form');
var filterForm = cityMap.querySelector('.map__filters');
var mainPin = cityMap.querySelector('.map__pin--main');
var inputPrice = cardForm.querySelector('#price');
var typeHousing = cardForm.querySelector('#type');

// Фукнция меняет минимальную цену, в зависимости от выбранного жилья
var onChangePrice = function () {
  var currenItemSelected = typeHousing.value;
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

onChangePrice();
typeHousing.addEventListener('change', onChangePrice);

var timeIn = cardForm.querySelector('#timein');
var timeOut = cardForm.querySelector('#timeout');

// Функция синхронизирует время заезда /выезда
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

var mainPinLocationX = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
var mainPinLocationY = Math.floor(mainPin.offsetTop + mainPin.offsetHeight / 2);
var inputAdress = cardForm.querySelector('#address');

inputAdress.value = mainPinLocationX + '.' + mainPinLocationY;

// Блокируем поля форм
addAttributeDisabled(cardForm.children);
addAttributeDisabled(filterForm.children);

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

//  Создает массив объектов карточек
var genCardsData = function (cardsCount) {
  var cardsData = [];
  for (var i = 1; i <= cardsCount; i++) {
    cardsData.push(
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
  return cardsData;
};

//  Создаем Дом-элемент Пина, с подготовленными местами для вставки данных с массива объекта
var createPinElement = function (card) {
  var newPin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  var newPinImg = newPin.querySelector('img');
  newPinImg.src = card.author.avatar;
  newPinImg.alt = card.offer.type;
  newPin.style.left = correctPinLocationX(card.location.x, PIN_WIDTH) + 'px';
  newPin.style.top = correctPinLocationY(card.location.y, PIN_HEIGHT) + 'px';
  return newPin;
};

var cards = genCardsData(ADVERTISEMENTS_COUNT);

//  Возвращаем сгенерированный Фрагмент с готовыми Пинами, собранными из шаблона и массива объектов
var getPinsFragment = function (valueLength) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < valueLength; i++) {
    fragment.appendChild(createPinElement(cards[i]));
  }
  return fragment;
};


// Ограничивает перемещение Пина по оси Х
var setLimitMovementMainPinX = function (coordinateX) {
  if (coordinateX < 0) {
    coordinateX = 0;
  }
  if (coordinateX > LOCATION_MAX_X - mainPin.offsetWidth) {
    coordinateX = LOCATION_MAX_X - mainPin.offsetWidth;
  }
  return coordinateX;
};

// Ограничивает перемещение Пина по оси Y
var setLimitMovementMainPinY = function (coordinateY) {
  if (coordinateY > LOCATION_MAX_Y) {
    coordinateY = LOCATION_MAX_Y;
  }
  if (coordinateY < LOCATION_MIN_Y) {
    coordinateY = LOCATION_MIN_Y;
  }
  return coordinateY;
};

// Возвращает координаты метки, в зависимости от атрибута функции (середина Пина или координаты, на которые метка указывает своим острым концом)
var mainPinReferencePoint = function (position) {
  var referencePoint;
  if (position === 'center') {
    referencePoint = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2) + '.' + Math.floor(mainPin.offsetTop + mainPin.offsetHeight / 2);
    return referencePoint;
  }

  if (position === 'bottom') {
    referencePoint = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2) + '.' + Math.floor(mainPin.offsetTop + mainPin.offsetHeight);
    return referencePoint;
  }
};

var isDisabledMap = true;
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var isMove = false;
  var startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    isMove = true;
    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.left = setLimitMovementMainPinX(mainPin.offsetLeft - shift.x) + 'px';
    mainPin.style.top = setLimitMovementMainPinY(mainPin.offsetTop - shift.y) + 'px';

    if (isDisabledMap) {
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
        cardForm.classList.remove('ad-form--disabled');
        delAttributeDisabled(cardForm.children);
        delAttributeDisabled(filterForm.children);
        document.querySelector('.map__pins').appendChild(getPinsFragment(cards.length));
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
