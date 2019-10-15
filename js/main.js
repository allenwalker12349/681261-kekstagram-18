'use strict';

(function () {

  var addPhoto = function (photoArr) {
    var picturersContainer = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoArr.length; i++) {
      var photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photoArr[i].url;
      photoElement.querySelector('.picture__likes').textContent = photoArr[i].likes;
      photoElement.querySelector('.picture__comments').textContent = photoArr[i].comments.length;
      fragment.appendChild(photoElement);
    }
    picturersContainer.appendChild(fragment);
  };

  var showError = function () {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    main.appendChild(errorTemplate);
  };

  var onError = function () {
    showError();
  };

  var onSuccess = function (data) {
    addPhoto(data);
  };

  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);

})();
