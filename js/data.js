'use strict';

(function () {
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var LOCATION_MIN_X = 0;
  var LOCATION_MAX_X = 1200;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;

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

  //  Возвращает массив объектов карточек
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

  window.data = {
    genCardsData: genCardsData,
    LOCATION_MIN_X: LOCATION_MIN_X,
    LOCATION_MAX_X: LOCATION_MAX_X,
    LOCATION_MIN_Y: LOCATION_MIN_Y,
    LOCATION_MAX_Y: LOCATION_MAX_Y,
  };
})();


