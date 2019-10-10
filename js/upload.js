'use strict';

(function () {
  var uploadInput = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadCancelBtn = uploadPopup.querySelector('#upload-cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var hashTagInput = uploadForm.querySelector('.text__hashtags');

  uploadInput.addEventListener('change', function () {
    uploadPopup.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (document.activeElement !== hashTagInput) {
        if (evt.keyCode === 27) {
          uploadPopup.classList.add('hidden');
          uploadForm.reset();
        }
      }
    });
  });

  uploadCancelBtn.addEventListener('click', function () {
    uploadPopup.classList.add('hidden');
    uploadForm.reset();
  });
})();
