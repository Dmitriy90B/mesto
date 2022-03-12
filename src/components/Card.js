export default class Card {
  constructor({data, handleCardClick, handleAddLikeClick, handleDeleteLikeClick, handleDeleteIconClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleAddLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    const getCardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__position')
      .cloneNode(true);
    return getCardElement;
  }

  getCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._elementsItem = this._element.querySelector('.elements__item');
    this._elementsItem.src = this._link;
    this._elementsItem.alt = this._name;
    this._likeCard = this._element.querySelector('.elements__like');
    this._cardTrash = this._element.querySelector('.elements__trash');

    this._likeToggle();
    this._getTrashById();
    this._setEventListeners();
    return this._element;
  }


  _likeToggle() {
    this._element.querySelector('.elements__likes').textContent = this._likes.length;
    if (this._likeById()) {
      this._likeCard.classList.add('elements__like_active');
    } else {
      this._likeCard.classList.remove('elements__like_active');
    }
  }

   _likeById() {
    return this._likes.some((item) => item._id === this._userId);
  }

  // ПРОВЕРИТЬ ЛАЙКИ
  checkYourLikes(data) {
    this._likes = data.likes;
    this._likeToggle();
  }

  getCardId() {
    return this._cardId;
  }

  _getTrashById() {
    if (this._ownerId !== this._userId) {
      this._cardTrash.remove();
    }
  }

  deleteByTrash() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeCard.addEventListener('click', () =>  {
      if (this._likeCard.classList.contains('elements__like_active')) {
        this._handleLikeClick(this._cardId);
      } else {
        this._handleDeleteLikeClick(this._cardId);
      }
    });
    this._cardTrash.addEventListener('click', () => this._handleDeleteIconClick(this._cardId));  // _deleteByTrash (evt)
    this._elementsItem.addEventListener('click', () => this._handleCardClick({
      link: this._link,
      name: this._name
    }));
  }
}
