

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
    this._isLiked = false;
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
    this._checkLikes()
    this._showTrashButton();
    this._setEventListeners();

    return this._element;
  }

  likedCard() {
    this._cardLike.classList.add('element__like_active')
  }
  unlikedCard() {
    this._cardLike.classList.remove('element__like_active')
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  likesCount(likeCount) {
    this._likeCounter.textContent = likeCount;
  }

  _checkLikes() {
    this.likes.forEach((item) => {
      if (this.userId === item._id) {
        this.likedCard();
        this._isLiked = true;
      }

    });
  }

  _handleLikeButton() {
    this._handleLikeClick(
      this._isLiked,
      this._id,
      this._elementLikes
    );
    this._cardLike.classList.toggle("element__like_active");
    this._isLiked = !this._isLiked;
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
