'use strict';

(function () {
  var MAX_QUANTITY = 5;
  var MAX_LENGTH = 20;

  var uploadForm = document.querySelector('#upload-select-image');
  var hashTagInput = uploadForm.querySelector('.text__hashtags');

  var isTagRepeat = function (arr) {
    var flag;
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
      for (var j = i + 1; j < n; j++) {
        if (arr[i] === arr[j]) {
          flag = true;
        } else {
          flag = false;
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

  var isBadQuantity = function (arr) {
    var flag;
    if (arr.length > MAX_QUANTITY) {
      flag = true;
    }
    return flag;
  };

  hashTagInput.addEventListener('input', function () {
    var tags = hashTagInput.value.toLowerCase().split(' ');
    var erorrMessage = [];
    var isCorrect = true;

    for (var i = 0; i < tags.length; i++) {

      if (isBadFormat(tags[i])) {
        erorrMessage.push(' Хеш-тег должен начинаться со знака # и не может состоять только из него');
        isCorrect = false;
      }

      if (isNoSpace(tags[i])) {
        erorrMessage.push(' Хеш-Теги должны быть разделены пробелом');
        isCorrect = false;
      }

      if (isBadLength(tags[i])) {
        erorrMessage.push(' Максимум ' + MAX_LENGTH + ' символов включая #');
        isCorrect = false;
      }
    }

    if (isTagRepeat(tags)) {
      erorrMessage.push(' Хеш-Теги не могут повторяться');
      isCorrect = false;
    }

    if (isBadQuantity(tags)) {
      erorrMessage.push(' Максимум 5 хеш-тегов');
      isCorrect = false;
    }


    if (!isCorrect) {
      hashTagInput.setCustomValidity(erorrMessage);
    } else {
      hashTagInput.setCustomValidity('');
    }

    hashTagInput.checkValidity();
  });
})();
