const popupImage = document.querySelector('.popup-image');
const popupImagePhoto = document.querySelector('.popup-image__photo');
const popupImageText = document.querySelector('.popup-image__text');

export class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this.name = card.name;
    this.link = card.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleTrashButton() {
    const trashButton = this._element.querySelector('.element__trash');
    trashButton.addEventListener('click', () => {
      this._element.remove();
    });
  }

  _handleLikeButton() {
    const toggleLikeButton = this._element.querySelector('.element__like');
    toggleLikeButton.addEventListener('click', () => {
      toggleLikeButton.classList.toggle('element__like_active');
    });
  }

  // _openPopupCard() {
  //   const cardPhoto = this._element.querySelector('.element__photo');

  //   cardPhoto.addEventListener('click', () => {
  //     this._openPopupImage(popupImage);
  //     popupImagePhoto.src = cardPhoto.src;
  //     popupImagePhoto.alt = cardPhoto.alt;
  //     popupImageText.textContent = cardPhoto.alt;
  //   });
  // }

  _setEventListeners() {
    this._handleTrashButton();
    this._handleLikeButton();
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardTitle = this._element.querySelector('.element__text');

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;

    return this._element;
  }
}
