'use strict';

(function () {
  // Редактирование фото с помощью фильтров
  var scale = {
    MIN: 0,
    MAX: 100
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

  var valueConvertation = {
    one: 0.01,
    three: 0.03
  };

  var effects = {
    chrome: function (value) {
      return 'grayscale(' + value * valueConvertation.one + ')';
    },
    sepia: function (value) {
      return 'sepia(' + value * valueConvertation.one + ')';
    },
    marvin: function (value) {
      return 'invert(' + value + '%)';
    },
    phobos: function (value) {
      return 'blur(' + value * valueConvertation.three + 'px)';
    },
    heat: function (value) {
      return 'brightness(' + value * valueConvertation.three + ')';
    }
  };

  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('change', function (evt) {
      window.currentRadioValue = evt.target.value;
      var classListArr = previewImg.classList;
      previewImg.classList.remove(classListArr[0]);


      if (window.currentRadioValue === 'none') {
        effectLineContainer.style.display = 'none';
        previewImg.style.filter = '';
      } else {
        effectLineContainer.style.display = 'block';
        effectPin.style.left = 100 + '%';
        effectDepth.style.width = 100 + '%';
        previewImg.classList.add('effects__preview--' + window.currentRadioValue);
        applyFilter(scale.MAX);
      }
    });
  }

  // изменение глубины эффект
  var applyFilter = function (value) {
    previewImg.style.filter = effects[window.currentRadioValue](value);
  };

  var changePinPosition = function (value) {
    effectPin.style.left = value + '%';
    effectDepth.style.width = value + '%';
    effectValue.value = value;

    applyFilter(value);
  };

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var scaleCoords = {
        left: effectLine.getBoundingClientRect().left,
        right: effectLine.getBoundingClientRect().right
      };

      var pinPosition;

      cursorPosition = moveEvt.clientX;

      if (cursorPosition < scaleCoords.left) {
        pinPosition = scale.MIN;
      } else if (cursorPosition > scaleCoords.right) {
        pinPosition = scale.MAX;
      } else {
        pinPosition = Math.round((cursorPosition - scaleCoords.left) / effectLine.offsetWidth * 100);
      }
      changePinPosition(pinPosition);
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
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

  var controlerSmal = uploadOverlay.querySelector('.scale__control--smaller');
  var controlerBig = uploadOverlay.querySelector('.scale__control--bigger');
  var controlerValue = uploadOverlay.querySelector('.scale__control--value');
  var resizeData = {
    getCurrentSize: function () {
      return parseInt(controlerValue.value, 10);
    },
    step: 25,
    cofecient: 0.01,
    min: 25,
    max: 100,
    setSize: function (value) {
      previewImg.style.transform = 'scale(' + value * this.cofecient + ')';
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

  controlerSmal.addEventListener('click', function () {
    resizeData.resizeSmaller();
    resizeData.setSize(parseInt(controlerValue.value, 10));
  });

  controlerBig.addEventListener('click', function () {
    resizeData.resizeBigger();
    resizeData.setSize(parseInt(controlerValue.value, 10));
  });
})();
