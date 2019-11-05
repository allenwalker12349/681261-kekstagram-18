'use strict';

(function () {
  var ESC_CODE = 27;
  var fullPhoto = document.querySelector('.big-picture__img');
  var fullPhotoElement = document.querySelector('.big-picture');
  var commentsContainer = document.querySelector('.social__comments');

  window.addPhoto = function (photoArr) {
    var picturersContainer = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoArr.length; i++) {
      var photoElement = pictureTemplate.cloneNode(true);
      addPicClickHandler(photoElement, photoArr[i].url, photoArr[i].likes, photoArr[i].description, photoArr[i].comments);
      photoElement.querySelector('.picture__img').src = photoArr[i].url;
      photoElement.querySelector('.picture__likes').textContent = photoArr[i].likes;
      photoElement.querySelector('.picture__comments').textContent = photoArr[i].comments.length;
      fragment.appendChild(photoElement);
    }
    picturersContainer.appendChild(fragment);
  };

  var addPicClickHandler = function (element, url, likes, description, comments) {
    element.addEventListener('click', function () {
      fullPhotoElement.classList.remove('hidden');
      fullPhoto.querySelector('img').src = url;
      fullPhotoElement.querySelector('.likes-count').innerHTML = likes;
      fullPhotoElement.querySelector('.social__caption').innerHTML = description;

      clearComments();
      addComments(comments);

      hideBigPicture();
    });
  };

  var addComments = function (comments) {
    var commentFragment = document.createDocumentFragment();
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

    for (var i = 0; i < comments.length; i++) {
      var currentComment = commentTemplate.cloneNode(true);
      currentComment.querySelector('.social__picture').src = comments[i].avatar;
      currentComment.querySelector('.social__picture').alt = comments[i].name;
      currentComment.querySelector('.social__text').innerHTML = comments[i].message;
      commentFragment.appendChild(currentComment);
    }
    commentsContainer.appendChild(commentFragment);
  };

  var clearComments = function () {
    var currneCommentsPool = commentsContainer.querySelectorAll('.social__comment');
    for (var i = 0; i < currneCommentsPool.length; i++) {
      currneCommentsPool[i].remove();
    }
  };

  var hideBigPicture = function () {
    document.querySelector('.big-picture__cancel').addEventListener('click', function () {
      document.querySelector('.big-picture').classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        document.querySelector('.big-picture').classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
      }
    });
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
    window.addPhoto(data);
  };

  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);


})();
