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

  _setEventListeners() {}

  _toggleLikeButton() {
    this._element = this._getTemplate();
    const newElementLike = this._element.querySelector('.element__like');

    newElementLike.addEventListener('click', () => {
      newElementLike.classList.toggle('element__like_active');
    });
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
    this._setEventListeners();
    this._toggleLikeButton();
    this._trashButton();

    this._element.querySelector('.element__photo').src = this.link;
    this._element.querySelector('.element__text').textContent = this.name;

    return this._element;
  }
}
