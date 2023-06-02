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
const popupEdit = document.querySelector('.popup');
const closePopupButton = popupEdit.querySelector('.popup__close-button');
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

function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  hobbyInput.value = hobbyName.textContent;
}

openPopupEditButton.addEventListener('click', openPopupEdit);

closePopupButton.addEventListener('click', closePopupEdit);

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
    popupImage.classList.add('popup_opened');
    popupImagePhoto.src = linkInput.value;
    popupImageText.textContent = placeInput.value;
  });

  const newElementLike = newElement.querySelector('.element__like');

  newElementLike.addEventListener('click', function (event) {
    newElementLike.classList.toggle('element__like_active');
  });
  return newElement;
}

const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAddOpen = document.querySelector('.popup-add');
const placeInput = document.querySelector('.popup-add__input_text-place');
const linkInput = document.querySelector('.popup-add__input_text-link');
const elementText = document.querySelectorAll('.element__text');
const elementPhoto = document.querySelectorAll('.element__photo');
const popupAddTitle = document.querySelector('.popup-add__title');
const saveAddForm = document.querySelector('.popup-add__form');
const popupAddButton = document.querySelector('.popup-add__button');
const elementLike = document.querySelectorAll('.element__like');
const popupImage = document.querySelector('.popup-image');
const popupImagePhoto = document.querySelector('.popup-image__photo');
const popupImageText = document.querySelector('.popup-image__text');

elementPhoto.forEach(function (item) {
  item.addEventListener('click', function (event) {
    popupImage.classList.add('popup_opened');
    popupImagePhoto.src = item.src;
    popupImageText.textContent = item.alt;
    const closePopupButton = popupImage.querySelector('.popup__close-button');
    closePopupButton.addEventListener('click', closePopupImage);
  });
});

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
  popupImagePhoto.src = '';
  popupImageText.textContent = '';
}

function closePopupAdd() {
  popupAddOpen.classList.remove('popup_opened');
}

function openPopupAdd() {
  popupAddOpen.classList.add('popup_opened');
  placeInput.value = '';
  linkInput.value = '';

  const closePopupButton = popupAddOpen.querySelector('.popup__close-button');
  closePopupButton.addEventListener('click', closePopupAdd);
}

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
