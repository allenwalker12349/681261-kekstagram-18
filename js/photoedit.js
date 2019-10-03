'use strict';

// Редактирование фото с помощью фильтров
var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var previewImg = uploadOverlay.querySelector('img');
var effectsRadio = uploadOverlay.querySelectorAll('.effects__radio');
var effectLine = uploadOverlay.querySelector('.img-upload__effect-level');
var effectValue = uploadPopup.querySelector('.effect-level__value');

var valueConvertation = {
  one: function () {
    return effectValue.value * 0.01;
  },
  three: function () {
    return effectValue.value * 0.03;
  }
};

var effects = {
  chrome: function () {
    return 'grayscale(' + valueConvertation.one() + ')';
  },
  sepia: function () {
    return 'sepia(' + valueConvertation.one() + ')';
  },
  marvin: function () {
    return 'invert(' + effectValue.value + '%)';
  },
  phobos: function () {
    return 'blur(' + valueConvertation.three() + 'px)';
  },
  heat: function () {
    return 'brightness(' + valueConvertation.three() + ')';
  }
};

for (var i = 0; i < effectsRadio.length; i++) {
  effectsRadio[i].addEventListener('change', function (evt) {

    var CurrentRadioValue = evt.target.value;
    var classListArr = previewImg.classList;

    if (CurrentRadioValue === 'none') {
      effectLine.style.display = 'none';
      previewImg.classList.remove(classListArr[0]);
      previewImg.style.filter = '';
    } else {
      effectLine.style.display = 'block';
      previewImg.classList.remove(classListArr[0]);
      previewImg.classList.add('effects__preview--' + CurrentRadioValue);
      previewImg.style.filter = effects[CurrentRadioValue]();
    }
  });
}

// изменение размера фото

var controlerSmal = uploadOverlay.querySelector('.scale__control--smaller');
var controlerBig = uploadOverlay.querySelector('.scale__control--bigger');
var controlerValue = uploadOverlay.querySelector('.scale__control--value');
var resizeData = {
  step: 25,
  cofecient: 0.01,
  min: 25,
  max: 100,
  setSize: function (value) {
    previewImg.style.transform = 'scale(' + value * this.cofecient + ')';
  },
  resizeSmaller: function () {
    if (parseInt(controlerValue.value, 10) <= this.min) {
      return;
    } else {
      controlerValue.value = parseInt(controlerValue.value, 10) - this.step + '%';
    }
  },
  resizeBigger: function () {
    if (parseInt(controlerValue.value, 10) >= this.max) {
      return;
    } else {
      controlerValue.value = parseInt(controlerValue.value, 10) + this.step + '%';
    }
  }
};

controlerSmal.addEventListener('click', function () {
  resizeData.resizeSmaller();
  resizeData.setSize(parseInt(controlerValue.value, 10));
});

controlerBig.addEventListener('click', function () {
  resizeData.resizeBigger();
  resizeData.setSize(parseInt(controlerValue.value, 10));
});
