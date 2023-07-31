import './styles/index.css';

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const avatar = new URL('../src/images/Avatar.png', import.meta.url);
const mgu = new URL('../src/images/mgu.jpg', import.meta.url);

const photos = [
  // меняем исходные пути на переменные
  { name: 'avatar', link: avatar },
  { name: 'mgu', link: mgu }
];

import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';

import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { Api } from './scripts/Api.js';

const classNames = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  errorClass: 'popup__input-error_active'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editForm = document.querySelector('.popup-edit__form');
const addForm = document.querySelector('.popup-add__form');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile-info__edit-button');
const inputName = document.querySelector('#name-input');
const inputHobby = document.querySelector('#hobby-input');
const avatarProfile = document.querySelector('.profile__avatar');

avatarProfile.src = avatar;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: 'b176578c-765a-482e-945d-4755e5874088',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo('.profile-info__name', '.profile-info__hobby');

const user = await Promise.all([
  api.userInfo().catch((err) => {
    console.log(err);
  })
])

userInfo.setUserInfo(user)

const section = new Section(
  {
    items: initialCards,
    renderer: item => {
      section.addItem(createCard(item));
    }
  },
  '.elements'
);
section.renderItems();

addButton.addEventListener('click', function () {
  addFormCard.open();
});

const addFormCard = new PopupWithForm('.popup-add', items => {
  const card = {
    name: items.place,
    link: items.link
  };
  const newCard = createCard(card);
  section.addItem(newCard);
  addFormValidator.disableButton();
  addForm.reset();
  addFormCard.close();
});

addFormCard.setEventListeners();

const editFormProfile = new PopupWithForm('.popup-edit', items => {
  userInfo.setUserInfo({
    name: items.name,
    hobby: items.hobby
  });
  editFormValidator.disableButton();
  editFormProfile.close();
});

editButton.addEventListener('click', function () {
  editFormProfile.open();

  const values = userInfo.getUserInfo();

  inputName.value = values.name;
  inputHobby.value = values.hobby;
});

editFormProfile.setEventListeners();

const imagePopup = new PopupWithImage('.popup-image');

imagePopup.setEventListeners();

function handleCardClick(place, link) {
  imagePopup.open({ place, link });
}

function createCard(item) {
  const card = new Card(item, '.elements', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

const editFormValidator = new FormValidator(classNames, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classNames, addForm);
addFormValidator.enableValidation();
