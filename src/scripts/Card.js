

export class Card {
  constructor(card, templateSelector, userId, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._templateSelector = templateSelector;
    this.name = card.name;
    this.link = card.link;
    this.likes = card.likes;
    this._id = card._id
    this.userId = userId;
    this.ownerId = card.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._liked = false;
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


    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;
    this._likeCounter.textContent = this.likes.length;

    this._showTrashButton();
    this._setEventListeners();

    return this._element;
  }



  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeButton() {
    this._handleLikeClick(
      this.liked,
      this._id,
      this._likeCounter
    );
    this._cardLike.classList.toggle('element__like_active')
    this.liked = !this.liked;

  }

  _showTrashButton() {
    if (this.ownerId !== this.userId) {
      this._cardTrash.remove();
    }
  }


  _setEventListeners() {
    this._cardTrash.addEventListener('click', () => {
      this._handleDeleteClick()
    })

    this._cardLike.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });


  }
}
