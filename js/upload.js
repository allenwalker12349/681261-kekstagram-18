'use strict';

(function () {
  var ESC_CODE = 27;
  var uploadInput = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadCancelButton = uploadPopup.querySelector('#upload-cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var hashTagInput = uploadForm.querySelector('.text__hashtags');
  var commentInput = uploadForm.querySelector('.text__description');

  uploadInput.addEventListener('change', function () {
    uploadPopup.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (document.activeElement !== hashTagInput && document.activeElement !== commentInput) {
        if (evt.keyCode === ESC_CODE) {
          uploadPopup.classList.add('hidden');
          uploadForm.reset();
        }
      }
    });
  });

  uploadCancelButton.addEventListener('click', function () {
    window.closePopup();
  });
})();
