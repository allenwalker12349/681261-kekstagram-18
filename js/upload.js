'use strict';

var uploadInput = document.querySelector('#upload-file');
var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadCancelBtn = uploadPopup.querySelector('#upload-cancel');
var uploadForm = document.querySelector('.img-upload__form');

uploadInput.addEventListener('change', function () {
  uploadPopup.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
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

effectPin.addEventListener('mouseup', function (evt) {
  var cursorPostion = evt.clientX;
  var scaleCoords = {
    left: effectLine.getBoundingClientRect().left,
  };
  var pinPosition = Math.round((cursorPostion - scaleCoords.left) / effectLine.offsetWidth * 100);
  return pinPosition;
});
