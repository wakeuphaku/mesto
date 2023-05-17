let openPopupButton = document.querySelector('.profile__info_edit-button');
let popupOpen = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__container_close-button');
let nameInput = document.querySelector('#name-input');
let hobbyInput = document.querySelector('#hobby-input');
let profileName = document.querySelector('.profile__info_name');
let hobbyName = document.querySelector('.profile__info_hobby');
let saveForm = document.querySelector('.popup__form');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

openPopupButton.addEventListener('click', function () {
  openPopup(popupOpen);
});

closePopupButton.addEventListener('click', function () {
  closePopup(popupOpen);
});

nameInput.value = profileName.textContent;
hobbyInput.value = hobbyName.textContent;

saveForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  hobbyName.textContent = hobbyInput.value;
  closePopup(popupOpen);
});
