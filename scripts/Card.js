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

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._element.querySelector('.elements').removeChild(this._element);
    });
  }

  _likeButton() {}

  createCard() {
    this._element = this._getTemplate();
    this._trashButton();

    const toggleLikeButton = this._element.querySelector('.element__like');
    toggleLikeButton.addEventListener('click', () => {
      toggleLikeButton.classList.toggle('element__like_active');
    });

    const openPopupCard = this._element.querySelector('.element__photo');
    openPopupCard.addEventListener('click', () => {
      popupImagePhoto.src = openPopupCard.src;
      popupImageText.textContent = openPopupCard.alt;
      popupImage.classList.add('popup_opened');
    });

    this._element.querySelector('.element__photo').src = this.link;
    this._element.querySelector('.element__photo').alt = this.name;
    this._element.querySelector('.element__text').textContent = this.name;

    return this._element;
  }
}
