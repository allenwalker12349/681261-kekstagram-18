'use strict';

var uploadOverlay = document.querySelector('.img-upload__overlay');
var previewImg = uploadOverlay.querySelector('img');
var effectsPreviewBtn = uploadOverlay.querySelectorAll('.effects__preview');

for (var i = 0; i < effectsPreviewBtn.length; i++) {
  effectsPreviewBtn[i].addEventListener('click', function (evt) {
    var target = evt.target;
    console.log(target);
  });
}
