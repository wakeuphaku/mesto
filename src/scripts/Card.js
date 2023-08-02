export class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this.name = card.name;
    this.link = card.link;
    this.likes = card.likes;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardLike = this._element.querySelector('.element__like');
    this._cardTitle = this._element.querySelector('.element__text');
    this._cardTrash = this._element.querySelector('.element__trash');
    this._cardImage = this._element.querySelector('.element__photo');
    this._likeCounter = this._element.querySelector('.element__like_counter')

    this._setEventListeners();

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;
    this._likeCounter.textContent = this.likes.length

    return this._element;
  }

  _handleTrashButton() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeButton() {
    this._cardLike.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._cardTrash.addEventListener('click', () => {
      this._handleTrashButton();
    });

    this._cardLike.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }
}
