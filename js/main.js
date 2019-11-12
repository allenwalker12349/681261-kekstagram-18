'use strict';

(function () {
  var ESC_CODE = 27;
  var NUM = 5;
  var START = 0;
  var fullPhoto = document.querySelector('.big-picture__img');
  var fullPhotoElement = document.querySelector('.big-picture');
  var commentsContainer = document.querySelector('.social__comments');
  var loadCommentsBtn = fullPhotoElement.querySelector('.social__comments-loader');

  window.addPhoto = function (photoArr) {
    var picturersContainer = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    photoArr.forEach(function (item) {
      var photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = item.url;
      photoElement.querySelector('.picture__likes').textContent = item.likes;
      photoElement.querySelector('.picture__comments').textContent = item.comments.length;
      addPicClickHandler(photoElement, item);
      fragment.appendChild(photoElement);
    });
    picturersContainer.appendChild(fragment);
  };


  var addPicClickHandler = function (element, data) {
    element.addEventListener('click', function () {
      fullPhotoElement.classList.remove('hidden');
      fullPhoto.querySelector('img').src = data.url;
      fullPhotoElement.querySelector('.likes-count').innerHTML = data.likes;
      fullPhotoElement.querySelector('.social__caption').innerHTML = data.description;

      clearComments();

      addComent(data.comments, NUM, START);

      hideBigPicture();
    });
  };

  var addComent = function (comentArr, num, start) {
    document.querySelector('.comments-count').innerHTML = comentArr.length;
    var commentFragment = document.createDocumentFragment();
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

    var renderComment = function () {
      for (var i = start; i < start + num && i < comentArr.length; i++) {
        var currentComment = commentTemplate.cloneNode(true);
        currentComment.querySelector('.social__picture').src = comentArr[i].avatar;
        currentComment.querySelector('.social__picture').alt = comentArr[i].name;
        currentComment.querySelector('.social__text').innerHTML = comentArr[i].message;
        commentFragment.appendChild(currentComment);
      }
      commentsContainer.appendChild(commentFragment);
      start = start + num;
    };

    renderComment();
    changeNumofComments();

    loadCommentsBtn.addEventListener('click', function () {
      renderComment();
      changeNumofComments();
    });
  };

  var changeNumofComments = function () {
    var currentlyShowed = document.querySelector('.comments-total');
    var commentsTotal = document.querySelector('.comments-count');
    var displayedComments = document.querySelectorAll('.social__comment').length;
    if (parseInt(commentsTotal.innerHTML, 10) > displayedComments) {
      loadCommentsBtn.classList.remove('hidden');
      currentlyShowed.innerHTML = displayedComments;
    } else {
      currentlyShowed.innerHTML = displayedComments;
      loadCommentsBtn.classList.add('hidden');
    }
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
