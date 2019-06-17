'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getZero = function (number) {
  return (number < 10 ? '0' : '') + number;
};

var offersTypes = ['palace', 'flat', 'house', 'bungalo'];
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getAdvertisement = function (userInt) {
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

var getPinFragment = function (pinCount) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  for (var i = 1; i <= pinCount; i++) {
    var newPin = pinTemplate.cloneNode(true);
    var pinImg = newPin.querySelector('img');
    var pinLocationX = getAdvertisement(i).location.x - pinImg.getAttribute('width') / 2;
    var PinLocationY = getAdvertisement(i).location.y - pinImg.getAttribute('height');

    pinImg.setAttribute('src', getAdvertisement(i).author.avatar);
    pinImg.setAttribute('alt', getAdvertisement(i).offer.type);
    newPin.setAttribute('style', 'left: ' + pinLocationX + 'px; top: ' + PinLocationY + 'px;');
    pinFragment.appendChild(newPin);
  }
  return pinFragment;
};

map.querySelector('.map__pins').appendChild(getPinFragment(8));
