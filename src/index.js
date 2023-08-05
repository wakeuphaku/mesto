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
const avatarForm = document.querySelector('.popup-avatar__form')
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile-info__edit-button');
const inputName = document.querySelector('#name-input');
const inputHobby = document.querySelector('#hobby-input');
const avatarProfile = document.querySelector('.profile__avatar');
const trashButton = document.querySelector('.element__trash')



function changeButtonToSaving(popup) {
  popup.submitButton.textContent = 'Сохранение...';
}
function changeButtonToCreate(popup) {
  popup.submitButton.textContent = "Создать";
}

function changeButtonToSave(popup) {
  popup.submitButton.textContent = "Сохранить";
}

// API
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
  avatar: '.profile__avatar_image'
})

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






userInfo.setUserInfo({
  name: userPromise[0].name,
  hobby: userPromise[0].about,
  avatar: userPromise[0].avatar
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
  changeButtonToSaving(editFormProfile);
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
    .finally(() => {
      changeButtonToSave(editFormProfile)
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


addButton.addEventListener('click', function () {
  addFormCard.open();
});

avatarProfile.addEventListener('click', () => {
  avatarPopup.open()
})


// Попапы
const avatarPopup = new PopupWithForm('.popup-avatar', items => {
  changeButtonToSaving(avatarPopup)
  api.changeAvatar(items.link)
    .then((link) => {
      userInfo.changeAvatar(link.avatar)

      avatarPopup.close()
    }).catch((err) =>
      console.log(err))
    .finally(() => {
      changeButtonToSave(avatarPopup)
    })
})
avatarPopup.setEventListeners()

const addFormCard = new PopupWithForm('.popup-add', items => {
  changeButtonToSaving(addFormCard);
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
    .finally(() => {
      changeButtonToCreate(addFormCard)
    })
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



const imagePopup = new PopupWithImage('.popup-image');

imagePopup.setEventListeners();

function handleCardClick(place, link) {
  imagePopup.open({ place, link });
}



// Карточки
function createCard(item) {
  const card = new Card(item, '.elements', userPromise[0]._id, handleCardClick, () => {
    confirmPopup.open(card._id, card)
  },
    (liked, cardId) => {
      liked ? api.getLike(cardId) : api.deleteLike(cardId)
        .then((items) => {
          card._handleLikeButton(items.likes.length)
        }).catch((err) => {
          console.log(err)
        })
    })


  const cardElement = card.createCard();
  return cardElement;
}


// Валидация
const avatarPopupValidator = new FormValidator(classNames, avatarForm);
avatarPopupValidator.enableValidation();

const editFormValidator = new FormValidator(classNames, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classNames, addForm);
addFormValidator.enableValidation();

