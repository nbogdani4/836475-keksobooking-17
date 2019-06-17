'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getZero = function (number) {
  return (number < 10 ? '0' : '') + number;
};

var offersTypes = ['palace', 'flat', 'house', 'bungalo'];
var map = document.querySelector('.map');

var advertisement = function (userInt) {
  return {
    author: {
      avatar: 'img/avatars/user' + getZero(userInt) + '.png',
    },
    offer: {
      type: offersTypes[getRandomInt(0, offersTypes.length - 1)],
    },
    location: {
      x: getRandomInt(0, map.clientWidth),
      y: getRandomInt(130, 630),
    }
  };
};

map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();

for (var i = 1; i <= 8; i++) {
  var newPin = pinTemplate.cloneNode(true);
  var pinImg = newPin.querySelector('img');
  pinImg.setAttribute('src', advertisement(i).author.avatar);
  pinImg.setAttribute('alt', advertisement(i).offer.type);
  newPin.setAttribute('style', 'left: ' + advertisement(i).location.x + 'px; top: ' + advertisement(i).location.y + 'px;');
  pinFragment.appendChild(newPin);
}
map.querySelector('.map__pins').appendChild(pinFragment);
