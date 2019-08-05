'use strict';

(function () {

  var elementFilter = document.querySelector('.map__filters');
  var filterChildren = Array.from(elementFilter.children);
  var filterHousingType = elementFilter.querySelector('#housing-type');

  // Активируем фильтр
  var activateFilter = function () {
    filterChildren.forEach(window.util.enableElement);
  };

  // Блокируем фильтр
  var disableFilter = function () {
    filterChildren.forEach(window.util.disableElement);
    elementFilter.reset();
  };

  var updataPins = function (housingType) {

    var filteringByHousing;
    if (housingType === 'any') {
      filteringByHousing = window.util.pins;
    } else {
      filteringByHousing = window.util.pins.filter(function (it) {
        return it.offer.type === housingType;
      });
    }
    window.map.deletePins();
    window.pins.getPinsFragment(filteringByHousing);
  };


  filterHousingType.addEventListener('change', function (evt) {
    updataPins(evt.target.value);
  });


  disableFilter();

  window.filter = {
    activateFilter: activateFilter,
    disableFilter: disableFilter,
  };

})();
