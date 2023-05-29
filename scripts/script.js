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

const openPopupButton = document.querySelector('.profile-info__edit-button');
const popupOpen = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_text_name');
const hobbyInput = document.querySelector('.popup__input_text_hobby');
const profileName = document.querySelector('.profile-info__name');
const popupTitle = document.querySelector('.popup__title');
const hobbyName = document.querySelector('.profile-info__hobby');
const saveForm = document.querySelector('.popup__form');
const popupButton = document.querySelector('.popup__button');
const addForm = document.querySelector('.popup__form');
const template = document.querySelector('.elements');
const templateContent = template.content;
const element = templateContent.querySelector('.element');
const addButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup-image');
const elementPhoto = document.querySelector('.element__trash');

function closePopup() {
  popupOpen.classList.remove('popup_opened');
}

function openPopup() {
  popupOpen.classList.add('popup_opened');
  nameInput.placeholder = 'Введите что-нибудь!';
  hobbyInput.placeholder = 'Введите что-нибудь!';
  nameInput.value = profileName.textContent;
  hobbyInput.value = hobbyName.textContent;
  popupTitle.textContent = 'Редактировать профиль';
  popupButton.textContent = 'Сохранить';
}

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

saveForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  hobbyName.textContent = hobbyInput.value;
  closePopup();
});

initialCards.forEach(function (item) {
  const newElement = addCard(item);
  template.append(newElement);
});

function addCard(value) {
  const newElement = element.cloneNode(true);

  const elementText = newElement.querySelector('.element__text');
  const elementPhoto = newElement.querySelector('.element__photo');

  elementPhoto.src = value.link;
  elementText.textContent = value.name;

  return newElement;
}
addButton.addEventListener('click', openPopupAdd);

function openPopupAdd() {
  popupOpen.classList.add('popup_opened');
  nameInput.placeholder = 'Название';
  hobbyInput.placeholder = 'Ссылка на картинку';
  popupTitle.textContent = 'Новое место';
  popupButton.textContent = 'Создать';
}

elementPhoto.addEventListener('click', openPopupAdd);

function openImagePopup() {
  popupImage.classList.add('popup_opened');
}
