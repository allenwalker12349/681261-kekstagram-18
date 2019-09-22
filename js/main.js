'use strict';

var AMOUNT_OF_PICTURES = 25;
var MIN_NUM_OF_AVATAR = 1;
var MAX_NUM_OF_AVATAR = 6;
var MIN_NUM_OF_LIKES = 15;
var MAX_NUM_OF_LIKES = 200;
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
      likes: getRandomNum(MIN_NUM_OF_LIKES, MAX_NUM_OF_LIKES),
      comments: [
        {
          avatar: 'img/avatar-' + getRandomNum(MIN_NUM_OF_AVATAR, MAX_NUM_OF_AVATAR) + '.svg',
          message: COMMENTS[getRandomNum(COMMENTS.length - COMMENTS.length, COMMENTS.length)],
          name: NAMES[getRandomNum(NAMES.length - NAMES.length, NAMES.length)]
        },
        {
          avatar: 'img/avatar-' + getRandomNum(MIN_NUM_OF_AVATAR, MAX_NUM_OF_AVATAR) + '.svg',
          message: COMMENTS[getRandomNum(COMMENTS.length - COMMENTS.length, COMMENTS.length)],
          name: NAMES[getRandomNum(NAMES.length - NAMES.length, NAMES.length)]
        },
        {
          avatar: 'img/avatar-' + getRandomNum(MIN_NUM_OF_AVATAR, MAX_NUM_OF_AVATAR) + '.svg',
          message: COMMENTS[getRandomNum(COMMENTS.length - COMMENTS.length, COMMENTS.length)],
          name: NAMES[getRandomNum(NAMES.length - NAMES.length, NAMES.length)]
        },
        {
          avatar: 'img/avatar-' + getRandomNum(MIN_NUM_OF_AVATAR, MAX_NUM_OF_AVATAR) + '.svg',
          message: COMMENTS[getRandomNum(COMMENTS.length - COMMENTS.length, COMMENTS.length)],
          name: NAMES[getRandomNum(NAMES.length - NAMES.length, NAMES.length)]
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
    photoElement.querySelector('.picture__comments').textContent = getRandomNum(photoArr[i].comments.length - photoArr[i].comments.length, photoArr[i].comments.length);
    fragment.appendChild(photoElement);
  }
  picturersContainer.appendChild(fragment);
}

addPhoto(photoDescriptions);
