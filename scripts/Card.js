export class Card {
  constructor(card, templateSelector, openPopupImage) {
    this._templateSelector = templateSelector;
    this.name = card.name;
    this.link = card.link;
    this._openPopupImage = openPopupImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _trashButton() {
    const elements = document.querySelector('.elements');
    const trashButton = this._element.querySelector('.element__trash');
    trashButton.addEventListener('click', () => {
      elements.removeChild(this._element);
    });
  }

  _likeButton() {
    const toggleLikeButton = this._element.querySelector('.element__like');
    toggleLikeButton.addEventListener('click', () => {
      toggleLikeButton.classList.toggle('element__like_active');
    });
  }

  _openPopupCard() {
    const cardPhoto = this._element.querySelectorAll('.element__photo');
    const popupImage = document.querySelector('.popup-image');
    const popupImagePhoto = document.querySelector('.popup-image__photo');
    const popupImageText = document.querySelector('.popup-image__text');
    cardPhoto.forEach(item => {
      item.addEventListener('click', () => {
        popupImage.classList.add('popup_opened');
        popupImagePhoto.src = this._element.querySelector('.element__photo').src;
        popupImageText.textContent = this._element.querySelector('.element__photo').alt;
      });
    });
  }

  _setEventListeners() {
    this._trashButton();
    this._likeButton();
    this._openPopupCard();
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__photo').src = this.link;
    this._element.querySelector('.element__photo').alt = this.name;
    this._element.querySelector('.element__text').textContent = this.name;

    return this._element;
  }
}
