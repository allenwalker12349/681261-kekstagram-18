'use strict';

(function () {
  var MAX_QUANTITY = 5;
  var MAX_LENGTH = 20;

  var uploadForm = document.querySelector('#upload-select-image');
  var hashTagInput = uploadForm.querySelector('.text__hashtags');

  var isTagRepeat = function (tags) {
    var flag;
    for (var i = 0; i < tags.length; i++) {
      for (var j = i + 1; j < tags.length; j++) {
        if (tags[j] === tags[i]) {
          flag = true;
        }
      }
    }
    return flag;
  };

  var isBadFormat = function (tag) {
    var flag;
    if (tag[0] !== '#' || tag.length === 1) {
      flag = true;
    }
    return flag;
  };

  var isNoSpace = function (tag) {
    var flag;
    if (tag.indexOf('#', 1) !== -1) {
      flag = true;
    }
    return flag;
  };

  var isBadLength = function (tag) {
    var flag;
    if (tag.length > MAX_LENGTH) {
      flag = true;
    }
    return flag;
  };

  var isBadQuantity = function (tags) {
    var flag;
    if (tags.length > MAX_QUANTITY) {
      flag = true;
    }
    return flag;
  };

  var addRedBorder = function (element) {
    element.classList.add('red-error-border');
  };

  var deleteRedBorder = function (element) {
    element.classList.remove('red-error-border');
  };

  var validationHandler = function () {
    var tags = hashTagInput.value.toLowerCase().trim().split(' ');
    var errors = [];
    var isCorrect = true;

    for (var i = 0; i < tags.length; i++) {

      if (isBadFormat(tags[i])) {
        errors.push(' Хеш-тег должен начинаться со знака # и не может состоять только из него');
        isCorrect = false;
      }

      if (isNoSpace(tags[i])) {
        errors.push(' Хеш-Теги должны быть разделены пробелом');
        isCorrect = false;
      }

      if (isBadLength(tags[i])) {
        errors.push(' Максимум ' + MAX_LENGTH + ' символов включая #');
        isCorrect = false;
      }
    }

    if (isTagRepeat(tags)) {
      errors.push(' Хеш-Теги не могут повторяться');
      isCorrect = false;
    }

    if (isBadQuantity(tags)) {
      errors.push(' Максимум 5 хеш-тегов');
      isCorrect = false;
    }


    if (!isCorrect) {
      addRedBorder(document.activeElement);
      hashTagInput.setCustomValidity(errors);
    } else {
      deleteRedBorder(document.activeElement);
      hashTagInput.setCustomValidity('');
    }

    hashTagInput.checkValidity();
  };

  hashTagInput.addEventListener('input', validationHandler);
})();
