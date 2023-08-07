import './styles/index.css';


import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import { Api } from './scripts/Api.js'
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithConfirm } from './scripts/PopupWithConfirm';
import { classNames, editForm, addForm, avatarForm, addButton, editButton, inputName, inputHobby, avatarProfile } from './constants/constants.js';




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
  about: '.profile-info__hobby',
  avatar: '.profile__avatar-image'
})
let userId;


Promise.all([api.userInfo(), api.getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    section.renderItems(cards);
    console.log(userId)
  })
  .catch((err) => {
    console.log(err);
  });



const section = new Section(
  {
    renderer: item => {
      section.addItem(createCard(item));
    }
  },
  '.elements'
);


// Редактирование профиля
const editFormProfile = new PopupWithForm('.popup-edit', items => {
  changeButtonToSaving(editFormProfile);
  api.editProfile(items)
    .then((items) => {
      console.log(items)
      userInfo.setUserInfo({
        name: items.name,
        about: items.about,
        avatar: items.avatar
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
  inputHobby.value = values.about;
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
      avatarForm.reset()
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
  const card = new Card(item, '.elements', userId, handleCardClick, () => {
    confirmPopup.open(card._id, card)
  },
    (isLiked, cardId) => {
      if (isLiked) {
        api.deleteLike(cardId)
          .then((items) => {
            card.likesCount(items.likes.length)

          })
      } else {
        api.getLike(cardId)
          .then((items) => {
            card.likesCount(items.likes.length)
          })
      }
    })
  const cardElement = card.createCard();
  return cardElement;
}


// Валидация
const avatarFormValidator = new FormValidator(classNames, avatarForm);
avatarFormValidator.enableValidation();


const editFormValidator = new FormValidator(classNames, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classNames, addForm);
addFormValidator.enableValidation();

