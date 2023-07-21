import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';

import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';

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

const userInfo = new UserInfo('.profile-info__name', '.profile-info__hobby');

const section = new Section(
  {
    items: initialCards,
    renderer: item => {
      section.addItem(createCard(item));
    }
  },
  '.elements'
);
section.renderer();

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
