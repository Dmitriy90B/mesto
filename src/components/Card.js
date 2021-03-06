export default class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
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

  likeById() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _likeToggle() {
    this._element.querySelector('.elements__likes').textContent = this._likes.length;
    if (this.likeById()) {
      this._likeCard.classList.add('elements__like_active');
    } else {
      this._likeCard.classList.remove('elements__like_active');
    }
  }

  checkYourLikes(data) {
    this._likes = data.likes;
    this._likeToggle();
  }

  cardId() {
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
    this._likeCard.addEventListener('click', () => this._handleLikeClick(this));
    this._cardTrash.addEventListener('click', () => this._handleDeleteIconClick(this));
    this._elementsItem.addEventListener('click', () => this._handleCardClick({
      link: this._link,
      name: this._name
    }));
  }
}
