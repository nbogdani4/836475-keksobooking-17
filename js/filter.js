'use strict';

(function () {

  var elementFilter = document.querySelector('.map__filters');
  var filterChildren = Array.from(elementFilter.children);

  // Активируем фильтр
  var activateFilter = function () {
    filterChildren.forEach(window.util.enableElement);
  };

  // Блокируем фильтр
  var disableFilter = function () {
    filterChildren.forEach(window.util.disableElement);
    elementFilter.reset();
  };

  disableFilter();

  window.filter = {
    activateFilter: activateFilter,
    disableFilter: disableFilter
  };

})();
