'use strict';

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

var isBadFormat = function (arr) {
  var flag;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] !== '#' || arr[i].length === 1) {
      flag = true;
    }
  }
  return flag;
};

var isNoSpace = function (arr) {
  var flag;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].indexOf('#', 1) !== -1) {
      flag = true;
    }
  }
  return flag;
};

var isBadLength = function (arr) {
  var flag;
  for (var i = 0; i < arr.length; i++) {
    if (arr.length > MAX_QUANTITY || arr[i].length > MAX_LENGTH) {
      flag = true;
    }
  }
  return flag;
};

hashTagInput.addEventListener('input', function () {
  var tags = hashTagInput.value.toLowerCase().split(' ');
  var erorrMessage = [];
  var isCorrect = true;

  if (isBadFormat(tags)) {
    erorrMessage.push(' Хеш-тег должен начинаться со знака # и не может состоять только из него');
    isCorrect = false;
  }

  if (isNoSpace(tags)) {
    erorrMessage.push(' Хеш-Теги должны быть разделены пробелом');
    isCorrect = false;
  }

  if (isTagRepeat(tags)) {
    erorrMessage.push(' Хеш-Теги не могут повторяться');
    isCorrect = false;
  }

  if (isBadLength(tags)) {
    erorrMessage.push(' Максимум ' + MAX_QUANTITY + ' хеш-тегов, каждый не длине ' + MAX_LENGTH + ' символов');
    isCorrect = false;
  }

  if (!isCorrect) {
    hashTagInput.setCustomValidity(erorrMessage);
  } else {
    hashTagInput.setCustomValidity('');
  }

  hashTagInput.checkValidity();
});
