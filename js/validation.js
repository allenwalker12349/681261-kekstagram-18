'use strict';

var MAX_QUANTITY = 5;
var MAX_LENGTH = 20;

var uploadForm = document.querySelector('#upload-select-image');
var uploadBtn = uploadForm.querySelector('#upload-submit');
var hashTagInput = uploadForm.querySelector('.text__hashtags');

var isTagRepeat = function (arr) {
  var n = arr.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = i + 1; j < n; j++) {
      if (arr[i] === arr[j]) {
        return true;
      }
    }
  }
  return false;
};

uploadBtn.addEventListener('click', function () {
  var tags = hashTagInput.value.toLowerCase().split(' ');
  for (var i = 0; i < tags.length; i++) {
    if (tags[i][0] !== '#') {
      hashTagInput.setCustomValidity('Хеш-Тег должен начинаться с символа #');
    } else if (tags[i][0] === '#' && tags[i].length === 1) {
      hashTagInput.setCustomValidity('Хеш-Тег не может состоять только из символа #');
    } else if (tags[i].indexOf('#', 1) !== -1) {
      hashTagInput.setCustomValidity('Хеш-Теги должны быть разделены пробелом');
    } else if (isTagRepeat(tags)) {
      hashTagInput.setCustomValidity('Хеш-Теги не могут повторяться');
    } else if (tags.length > MAX_QUANTITY) {
      hashTagInput.setCustomValidity('Нельзя указать больше ' + MAX_QUANTITY + ' хэш-тегов');
    } else if (tags[i].length > MAX_LENGTH) {
      hashTagInput.setCustomValidity('Хеш-тег не должен быть длинее ' + MAX_LENGTH + ' символов, включая #');
    }
  }
});
