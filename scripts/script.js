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

const openPopup = function (item) {
  item.classList.add('popup_opened');
};

const closePopup = function (item) {
  item.classList.remove('popup_opened');
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

initialCards.forEach(function (item) {
  const newElement = createCard(item);
  template.append(newElement);
});

function createCard(item) {
  const newElement = element.cloneNode(true);

  const elementText = newElement.querySelector('.element__text');
  const elementPhoto = newElement.querySelector('.element__photo');
  elementPhoto.src = item.link;
  elementText.textContent = item.name;
  elementPhoto.alt = elementText.textContent;

  const trashButton = newElement.querySelector('.element__trash');
  trashButton.addEventListener('click', function () {
    template.removeChild(newElement);
  });

  const newElementPhoto = newElement.querySelector('.element__photo');

  newElementPhoto.addEventListener('click', function (event) {
    openPopup(popupImage);
    popupImagePhoto.src = elementPhoto.src;
    popupImageText.textContent = elementPhoto.alt;
  });

  const newElementLike = newElement.querySelector('.element__like');

  newElementLike.addEventListener('click', function (event) {
    newElementLike.classList.toggle('element__like_active');
  });
  return newElement;
}

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
const popupImagePhoto = document.querySelector('.popup-image__photo');
const popupImageText = document.querySelector('.popup-image__text');
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
}

closePopupAddButton.addEventListener('click', closePopupAdd);

openPopupAddButton.addEventListener('click', openPopupAdd);

saveAddForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newElement = createCard({
    name: placeInput.value,
    link: linkInput.value
  });

  template.prepend(newElement);
  closePopupAdd();
});

// Validation

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.classList.remove('popup__button_inactive');
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__input-error_active'
});
