'use strict';

var AMOUNT_OF_PICTURES = 25;
var COMMENTS = [
  'Все отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Кирилл', 'Алена', 'Саша', 'Даша', 'Вная', 'Наташа'];

var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function createPhotoDescription(amoutOfPhotos) {
  var photoDescriptionArray = [];

  for (var i = 1; i <= amoutOfPhotos; i++) {
    var currentPhotoDescription = {
      url: 'photos/' + [i] + '.jpg',
      description: 'Тут будет описание введеное пользователем',
      likes: getRandomNum(15, 200),
      comments: [
        {
          avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
          message: COMMENTS[getRandomNum(0, 5)],
          name: NAMES[getRandomNum(0, 5)]
        },
        {
          avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
          message: COMMENTS[getRandomNum(0, 5)],
          name: NAMES[getRandomNum(0, 5)]
        }
      ]
    };
    photoDescriptionArray.push(currentPhotoDescription);
  }
  return photoDescriptionArray;
}

var photoDescriptions = createPhotoDescription(AMOUNT_OF_PICTURES);

function addPhoto(photoArr) {
  var picturersContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photoArr.length; i++) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoArr[i].url;
    photoElement.querySelector('.picture__likes').textContent = photoArr[i].likes;
    photoElement.querySelector('.picture__comments').textContent = photoArr[i].comments.length;
    fragment.appendChild(photoElement);
  }
  picturersContainer.appendChild(fragment);
}

addPhoto(photoDescriptions);
