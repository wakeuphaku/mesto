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

function closePopup() {
  popupOpen.classList.remove('popup_opened');
}

function openPopup() {
  popupOpen.classList.add('popup_opened');
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

function addCard(item) {
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
  return newElement;
}

const openPopupAddButton = document.querySelector('.profile__add-button');
const closePopupAddButton = document.querySelector('.popup-add__close-button');
const popupAddOpen = document.querySelector('.popup-add');
const placeInput = document.querySelector('.popup-add__input_text_place');
const linkInput = document.querySelector('.popup-add__input_text_link');
const elementText = document.querySelectorAll('.element__text');
const elementPhoto = document.querySelectorAll('.element__photo');
const popupAddTitle = document.querySelector('.popup-add__title');
const saveAddForm = document.querySelector('.popup-add__form');
const popupAddButton = document.querySelector('.popup-add__button');
const elementLike = document.querySelectorAll('.element__like');
const popupImage = document.querySelector('.popup-image');
const popupImagePhoto = document.querySelector('.popup-image__photo');
const popupImageText = document.querySelector('.popup-image__text');
const closePopupImageButton = document.querySelector('.popup-image__close-button');

elementPhoto.forEach(function (item) {
  item.addEventListener('click', function (event) {
    const elementTextItem = document.querySelectorAll('.element__text');
    popupImage.classList.toggle('popup-image_opened');
    popupImagePhoto.src = item.src;
    popupImageText.textContent = item.alt;
  });
});

function closePopupImage() {
  popupImage.classList.remove('popup-image_opened');
  popupImagePhoto.src = '';
  popupImageText.textContent = '';
}

closePopupImageButton.addEventListener('click', closePopupImage);

elementLike.forEach(function (item) {
  item.addEventListener('click', function (event) {
    item.classList.toggle('element__like_active');
  });
});

function closePopupAdd() {
  popupAddOpen.classList.remove('popup-add_opened');
}

function openPopupAdd() {
  popupAddOpen.classList.add('popup-add_opened');
  placeInput.value = '';
  linkInput.value = '';
  popupAddTitle.textContent = 'Новое место';
  popupAddButton.textContent = 'Создать';
}

openPopupAddButton.addEventListener('click', openPopupAdd);

closePopupAddButton.addEventListener('click', closePopupAdd);

saveAddForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newElement = addCard({
    name: placeInput.value,
    link: linkInput.value
  });

  template.prepend(newElement);
  closePopupAdd();

  const newElementLike = document.querySelector('.element__like');

  newElementLike.addEventListener('click', function (event) {
    newElementLike.classList.toggle('element__like_active');
  });
  const newElementPhoto = document.querySelector('.element__photo');

  newElementPhoto.addEventListener('click', function (event) {
    popupImage.classList.add('popup-image_opened');
    popupImagePhoto.src = linkInput.value;
    popupImageText.textContent = placeInput.value;
  });
});
