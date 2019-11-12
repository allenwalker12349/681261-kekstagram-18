'use strict';

(function () {
  var AMOUNT_RANDOM_PICS = 10;
  var filters = document.querySelector('.img-filters');

  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var deleteItem = function (item) {
    item.remove();
  };

  var compareComments = function (a, b) {
    return b.comments.length - a.comments.length;
  };

  filters.classList.remove('img-filters--inactive');
  var filterBtn = filters.querySelectorAll('.img-filters__button');
  var lastTimeout;

  filterBtn.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      var filterBtnActive = filters.querySelector('.img-filters__button--active');
      filterBtnActive.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {

        switch (evt.target.id) {

          case 'filter-random':
            document.querySelectorAll('.picture').forEach(deleteItem);
            var randomPhotos = window.savedPhotoArr.slice();
            window.addPhoto(shuffle(randomPhotos).slice(0, AMOUNT_RANDOM_PICS));
            break;

          case 'filter-discussed':
            document.querySelectorAll('.picture').forEach(deleteItem);
            var discussedPhotos = window.savedPhotoArr.slice();
            window.addPhoto(discussedPhotos.sort(compareComments));
            break;

          default:
            document.querySelectorAll('.picture').forEach(deleteItem);
            window.addPhoto(window.savedPhotoArr);
        }
      }, 500);
    });
  });

})();
