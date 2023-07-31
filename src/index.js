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



const editForm = document.querySelector('.popup-edit__form');
const addForm = document.querySelector('.popup-add__form');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile-info__edit-button');
const inputName = document.querySelector('#name-input');
const inputHobby = document.querySelector('#hobby-input');
const avatarProfile = document.querySelector('.profile__avatar');
const userName = document.querySelector('.profile-info__name')
const userHobby = document.querySelector('.profile-info__hobby')
const userAvatar = document.querySelector('.profile__avatar')

avatarProfile.src = avatar;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: 'b176578c-765a-482e-945d-4755e5874088',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  name: '.profile-info__name',
  hobby: '.profile-info__hobby',
  avatar: '.profile__avatar'
});

const user = await Promise.all([
  api
    .userInfo()
    .catch((err) => {
      console.log(err);
    })
])
userInfo.setUserInfo(user)

//idk(
userHobby.textContent = user[0].about
userName.textContent = user[0].name
userAvatar.src = user[0].avatar

const initialCards = await Promise.all([
  api
    .getCards()
    .catch((err) => {
      console.log(err);
    })
])

const section = new Section(
  {
    items: initialCards[0],
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
  api
    .editProfile(items).catch((err) => {
      console.log(err)
    });
  api
    .userInfo().then((items) => {
      userInfo.setUserInfo(items)
      editFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })

  editFormValidator.disableButton();

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
