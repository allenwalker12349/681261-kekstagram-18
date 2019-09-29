'use strict';

var uploadInput = document.querySelector('#upload-file');
var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadCancelBtn = uploadPopup.querySelector('#upload-cancel');
var uploadForm = document.querySelector('.img-upload__form');
var hashTagInput = uploadForm.querySelector('.text__hashtags');

uploadInput.addEventListener('change', function () {
  uploadPopup.classList.remove('hidden');
  var isInputFocus = false;

  hashTagInput.addEventListener('focus', function () {
    isInputFocus = true;
  });

  hashTagInput.addEventListener('blur', function () {
    isInputFocus = false;
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && !isInputFocus) {
      uploadPopup.classList.add('hidden');
      uploadForm.reset();
    }
  });
});

uploadCancelBtn.addEventListener('click', function () {
  uploadPopup.classList.add('hidden');
  uploadForm.reset();
});


// изменение глубины эффект

var effectPin = uploadPopup.querySelector('.effect-level__pin');
var effectLine = uploadPopup.querySelector('.effect-level__line');
var effectDepth = uploadPopup.querySelector('.effect-level__depth');
var effectValue = uploadPopup.querySelector('.effect-level__value');

effectLine.addEventListener('mouseup', function (evt) {
  var cursorPostion = evt.clientX;
  var scaleCoords = {
    left: effectLine.getBoundingClientRect().left,
  };
  var pinPosition = Math.round((cursorPostion - scaleCoords.left) / effectLine.offsetWidth * 100);
  effectPin.style.left = pinPosition + '%';
  effectDepth.style.width = pinPosition + '%';
  effectValue.value = pinPosition;
});
