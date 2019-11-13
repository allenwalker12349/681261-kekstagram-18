'use strict';


(function () {
  var SUCCESS_STATUS = 200;
  var ESC_CODE = 27;
  var sendFormButton = document.querySelector('#upload-submit');
  var uploadForm = document.querySelector('#upload-select-image');
  var popUp = document.querySelector('.img-upload__overlay');


  sendFormButton.addEventListener('click', function (evt) {
    var hashTagInput = document.querySelector('.text__hashtags');
    if (hashTagInput.checkValidity()) {
      evt.preventDefault();
      var formData = new FormData(uploadForm);
      sendForm(formData, 'https://js.dump.academy/kekstagram');
    }
  });

  window.closePopup = function () {
    var previewImg = document.querySelector('.img-upload__preview').querySelector('img');
    uploadForm.querySelector('#effect-none').click();
    previewImg.style.transform = 'scale(1)';
    popUp.classList.add('hidden');
    uploadForm.reset();
  };

  var showPopUp = function (template) {
    var cloningElement = template;
    var currentPopUp = cloningElement.cloneNode(true);
    currentPopUp.addEventListener('click', function (evt) {
      if (evt.target !== document.querySelector('.success__inner') && evt.target !== document.querySelector('.error__inner')) {
        evt.target.remove();
      }
    });
    document.querySelector('main').appendChild(currentPopUp);


    return currentPopUp;
  };

  var closePopUpHandler = function (buttons, popup) {
    buttons.forEach(function (item) {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_CODE) {
          popup.remove();
        }
      });
      item.addEventListener('click', function () {
        popup.remove();
      });
    });
  };


  var sendForm = function (data, url) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        window.closePopup();
        showPopUp(document.querySelector('#success').content.querySelector('.success'));
        closePopUpHandler(document.querySelectorAll('.success__button'), document.querySelector('.success'));
      }
    });

    xhr.addEventListener('error', function () {
      window.closePopup();
      showPopUp(document.querySelector('#error').content.querySelector('.error'));
      closePopUpHandler(document.querySelectorAll('.error__button'), document.querySelector('.error'));
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

})();
