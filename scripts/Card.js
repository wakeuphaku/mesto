import { popupImage, popupImagePhoto, popupImageText } from './script.js';

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this.name = data.name;
    this.link = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _trashButton() {
    this._element = this._getTemplate();
    const elements = document.querySelector('.elements');
    const trashButton = this._element.querySelector('.element__trash');
    trashButton.addEventListener('click', () => {
      elements.removeChild(this._element);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._trashButton();

    const toggleLikeButton = this._element.querySelector('.element__like');
    toggleLikeButton.addEventListener('click', () => {
      toggleLikeButton.classList.toggle('element__like_active');
    });

    const openPopupCard = this._element.querySelector('.element__photo');
    openPopupCard.addEventListener('click', () => {
      popupImage.classList.add('popup_opened');
      popupImagePhoto.src = openPopupCard.src;
      popupImageText.textContent = openPopupCard.alt;
    });

    this._element.querySelector('.element__photo').src = this.link;
    this._element.querySelector('.element__photo').alt = this.name;
    this._element.querySelector('.element__text').textContent = this.name;

    return this._element;
  }
}
