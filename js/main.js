'use strict';

document.querySelector('.map').classList.remove('map--faded');
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_MIN_X = 0;
var LOCATION_MAX_X = document.querySelector('.map').clientWidth;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var ADVERTISEMENTS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var genRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomValue = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

//  Добавляет ведущий ноль, если число меньше двух знаков
var addLeadingZero = function (number) {
  return (number < 10 ? '0' : '') + number;
};

//  Корректирует положение Пина по оси Х, исходя от его размера
var correctPinLocationX = function (locationX, pinWidth) {
  return locationX - (pinWidth / 2);
};

//  Корректирует положение Пина по оси У, исходя от его высоты
var correctPinLocationY = function (locationY, pinHeight) {
  return locationY - pinHeight;
};

//  Создает массив из 8 сгенерированных объектов со свойствами объявлений
var advertisementsDataArray = [];
for (var i = 1; i <= ADVERTISEMENTS_COUNT; i++) {
  advertisementsDataArray.push(
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
  for (i = 0; i < valueLength; i++) {
    fragmentWithPins.appendChild(createPinElement(advertisementsDataArray[i]));
  }
  return fragmentWithPins;
};

//  Выводим на экран Пины Фрагмента
document.querySelector('.map__pins').appendChild(getFragmentWithPins(advertisementsDataArray.length));
