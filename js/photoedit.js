'use strict';

(function () {
  // Редактирование фото с помощью фильтров
  var Scale = {
    MIN: 0,
    MAX: 100
  };

  var Transformation = {
    one: 0.01,
    three: 0.03
  };

  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var previewImg = uploadOverlay.querySelector('img');
  var effectsRadio = uploadOverlay.querySelectorAll('.effects__radio');
  var effectValue = uploadOverlay.querySelector('.effect-level__value');
  var effectLineContainer = uploadOverlay.querySelector('.effect-level');
  var effectPin = uploadOverlay.querySelector('.effect-level__pin');
  var effectLine = uploadOverlay.querySelector('.effect-level__line');
  var effectDepth = uploadOverlay.querySelector('.effect-level__depth');
  var cursorPosition;

  var effects = {
    chrome: function (value) {
      return 'grayscale(' + value * Transformation.one + ')';
    },
    sepia: function (value) {
      return 'sepia(' + value * Transformation.one + ')';
    },
    marvin: function (value) {
      return 'invert(' + value + '%)';
    },
    phobos: function (value) {
      return 'blur(' + value * Transformation.three + 'px)';
    },
    heat: function (value) {
      return 'brightness(' + value * Transformation.three + ')';
    }
  };

  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('change', function (evt) {
      window.currentRadioValue = evt.target.value;
      var classes = previewImg.classList;
      previewImg.classList.remove(classes[0]);


      if (window.currentRadioValue === 'none') {
        effectLineContainer.style.display = 'none';
        previewImg.style.filter = '';
      } else {
        effectLineContainer.style.display = 'block';
        effectPin.style.left = 100 + '%';
        effectDepth.style.width = 100 + '%';
        previewImg.classList.add('effects__preview--' + window.currentRadioValue);
        window.applyFilter(Scale.MAX);
      }
    });
  }

  // изменение глубины эффект
  window.applyFilter = function (value) {
    previewImg.style.filter = effects[window.currentRadioValue](value);
  };

  var changePinPosition = function (value) {
    effectPin.style.left = value + '%';
    effectDepth.style.width = value + '%';
    effectValue.value = value;

    window.applyFilter(value);
  };

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var scaleCoords = {
        left: effectLine.getBoundingClientRect().left,
        right: effectLine.getBoundingClientRect().right
      };

      var pinPosition;

      cursorPosition = moveEvt.clientX;

      if (cursorPosition < scaleCoords.left) {
        pinPosition = Scale.MIN;
      } else if (cursorPosition > scaleCoords.right) {
        pinPosition = Scale.MAX;
      } else {
        pinPosition = Math.round((cursorPosition - scaleCoords.left) / effectLine.offsetWidth * 100);
      }
      changePinPosition(pinPosition);

      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // изменение размера фото

  var controlerSmall = uploadOverlay.querySelector('.scale__control--smaller');
  var controlerBig = uploadOverlay.querySelector('.scale__control--bigger');
  var controlerValue = uploadOverlay.querySelector('.scale__control--value');
  var resizeData = {
    getCurrentSize: function () {
      return parseInt(controlerValue.value, 10);
    },
    step: 25,
    coefficient: 0.01,
    min: 25,
    max: 100,
    setSize: function (value) {
      previewImg.style.transform = 'scale(' + value * this.coefficient + ')';
    },
    resizeSmaller: function () {
      if (this.getCurrentSize() > resizeData.min && this.getCurrentSize() <= resizeData.max) {
        controlerValue.value = parseInt(controlerValue.value, 10) - this.step + '%';
      }
    },
    resizeBigger: function () {
      if (this.getCurrentSize() >= resizeData.min && this.getCurrentSize() < resizeData.max) {
        controlerValue.value = parseInt(controlerValue.value, 10) + this.step + '%';
      }
    }
  };

  controlerSmall.addEventListener('click', function () {
    resizeData.resizeSmaller();
    resizeData.setSize(parseInt(controlerValue.value, 10));
  });

  controlerBig.addEventListener('click', function () {
    resizeData.resizeBigger();
    resizeData.setSize(parseInt(controlerValue.value, 10));
  });
})();
