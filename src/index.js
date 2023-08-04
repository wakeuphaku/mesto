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
import { Api } from './scripts/Api.js'
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithConfirm } from './scripts/PopupWithConfirm';

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
const trashButton = document.querySelector('.element__trash')

avatarProfile.src = avatar;

// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});

// Получение данных
const userPromise = await Promise.all([
  api.userInfo()
    .catch((err) => {
      console.log(err);
    }),
]);

const cardPromise = await Promise.all([
  api.getCards()
    .catch((err) => {
      console.log(err);
    }),
]);

// Применение данных
const userInfo = new UserInfo('.profile-info__name', '.profile-info__hobby')
const userId = userInfo._id

userInfo.setUserInfo({
  name: userPromise[0].name,
  hobby: userPromise[0].about
});

const section = new Section(
  {
    items: cardPromise[0],
    renderer: item => {
      section.addItem(createCard(item));
    }
  },
  '.elements'
);
section.renderItems();

// Редактирование профиля
const editFormProfile = new PopupWithForm('.popup-edit', items => {
  api.editProfile(items)
    .then((items) => {
      console.log(items)
      userInfo.setUserInfo({
        name: items.name,
        hobby: items.about
      })
    })
    .catch((err) => {
      console.log(err)
    })
  editFormProfile.close();
  editFormValidator.disableButton();
});

editButton.addEventListener('click', function () {
  editFormProfile.open();

  const values = userInfo.getUserInfo();

  inputName.value = values.name;
  inputHobby.value = values.hobby;
});
editFormProfile.setEventListeners();

// Добавление новой карточки
addButton.addEventListener('click', function () {
  addFormCard.open();
});

const addFormCard = new PopupWithForm('.popup-add', items => {
  api.getNewCard(items)
    .then((items) => {
      console.log(items)
      const newCard = createCard(items);
      section.addItem(newCard);
      addFormValidator.disableButton();
      addForm.reset();
      addFormCard.close();
    }).catch((err) =>
      console.log(err))
});
addFormCard.setEventListeners();

const confirmPopup = new PopupWithConfirm('.popup-confirm', (cardId, card) => {

  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard()
      confirmPopup.close()
    })
    .catch((err) => {
      console.log(err)
    })
})
confirmPopup.setEventListeners();

// Попапы
const imagePopup = new PopupWithImage('.popup-image');

imagePopup.setEventListeners();

function handleCardClick(place, link) {
  imagePopup.open({ place, link });
}


function createCard(item) {
  const card = new Card(item, '.elements', userId, handleCardClick, () => {
    confirmPopup.open(card._id, card)
  }, () => {
    api.getLike(card._id).then(() => {
      card._handleLikeButton()
    })
  },
    (liked, cardId) => {
      liked ? api.getLike(cardId) : api.deleteLike(cardId)
        .then((items) => {
          card.likeCard(items.likes.length)
        }).catch((err) => {
          console.log(err)
        })
    })
  const cardElement = card.createCard();
  return cardElement;
}

// Валидация
const editFormValidator = new FormValidator(classNames, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classNames, addForm);
addFormValidator.enableValidation(); 
