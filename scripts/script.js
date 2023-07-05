import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const openPopupEditButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup-edit');
const closePopupEditButton = popupEdit.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_text-name');
const hobbyInput = document.querySelector('.popup__input_text-hobby');
const profileName = document.querySelector('.profile-info__name');
const popupTitle = document.querySelector('.popup__title');
const hobbyName = document.querySelector('.profile-info__hobby');
const editForm = document.querySelector('.popup-edit__form');
const popupButton = document.querySelector('.popup__button');
const addForm = document.querySelector('.popup__form');
const template = document.querySelector('.elements');
const templateContent = template.content;
const element = templateContent.querySelector('.element');
const popupEditButton = document.querySelector('.popup-edit__button');

export const openPopup = function (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

const closePopup = function (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

function closePopupEdit() {
  closePopup(popupEdit);
}

function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  hobbyInput.value = hobbyName.textContent;
}

openPopupEditButton.addEventListener('click', openPopupEdit);

closePopupEditButton.addEventListener('click', closePopupEdit);

editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  hobbyName.textContent = hobbyInput.value;
  closePopupEdit();
});

initialCards.forEach(item => {
  const card = new Card(item, '.elements');
  const cardElement = card.createCard(item);

  document.querySelector('.elements').append(cardElement);
});

const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAddOpen = document.querySelector('.popup-add');
const placeInput = document.querySelector('.popup__input_text-place');
const linkInput = document.querySelector('.popup__input_text-link');
const elementText = document.querySelectorAll('.element__text');
const elementPhoto = document.querySelectorAll('.element__photo');
const popupAddTitle = document.querySelector('.popup-add__title');
const saveAddForm = document.querySelector('.popup-add__form');
const popupAddButton = document.querySelector('.popup-add__button');
const elementLike = document.querySelectorAll('.element__like');
const popupImage = document.querySelector('.popup-image');
const popupImagePhoto = document.querySelectorAll('.popup-image__photo');
const popupImageText = document.querySelectorAll('.popup-image__text');
const closePopupAddButton = popupAddOpen.querySelector('.popup__close-button');
const closePopupImageButton = popupImage.querySelector('.popup__close-button');

closePopupImageButton.addEventListener('click', closePopupImage);

function closePopupImage() {
  closePopup(popupImage);
  popupImagePhoto.src = '';
  popupImageText.textContent = '';
}

function closePopupAdd() {
  closePopup(popupAddOpen);
}

function openPopupAdd() {
  openPopup(popupAddOpen);
  placeInput.value = '';
  linkInput.value = '';

  popupAddButton.classList.add('popup__button_inactive');
  popupAddButton.disabled = true;
}

closePopupAddButton.addEventListener('click', closePopupAdd);

openPopupAddButton.addEventListener('click', openPopupAdd);

function newCreateCard(item) {
  const card = new Card(item, '.elements');
  return card.createCard();
}

function cardAdd(event) {
  event.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: linkInput.value
  };
  newCreateCard(newCard);
  template.prepend(newCreateCard(newCard));

  closePopup(popupAddOpen);
}

saveAddForm.addEventListener('submit', cardAdd);

const popupAll = document.querySelectorAll('.popup');

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popupAll.forEach(popup => {
  popup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

const editFormValidator = new FormValidator(classNames, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(classNames, saveAddForm);
addFormValidator.enableValidation();
