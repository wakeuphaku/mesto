let openPopupButton = document.querySelector('.profile-info__edit-button');
let popupOpen = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__input_text_name');
let hobbyInput = document.querySelector('.popup__input_text_hobby');
let profileName = document.querySelector('.profile-info__name');
let hobbyName = document.querySelector('.profile-info__hobby');
let saveForm = document.querySelector('.popup__form');

function closePopup() {
  popupOpen.classList.remove('popup_opened');
}

function openPopup() {
  popupOpen.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  hobbyInput.value = hobbyName.textContent;
}

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

saveForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  hobbyName.textContent = hobbyInput.value;
  closePopup(popupOpen);
});
