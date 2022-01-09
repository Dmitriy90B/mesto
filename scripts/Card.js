import {popupOpen} from './index.js';

export class Card {
  constructor(data, cardId) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = cardId;
  }

  _getTemplate() {
    const getCardElement = document
    .querySelector(this._cardId)
    .content
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
    this._setEventListeners();
    return this._element;
  }

  _likeToggle() {
    this._likeCard.classList.toggle('elements__like_active');
  }

  _deleteByTrash() {
    this._cardTrash.closest('.elements__position').remove();
  }

  _setEventListeners() {
    this._likeCard.addEventListener('click', () => this._likeToggle());
    this._cardTrash.addEventListener('click', () => this._deleteByTrash());
    this._elementsItem.addEventListener('click', () => this._openImage());
  }

  _openImage() {
    const popupImage = document.querySelector('.popup_type_image');
    const openPopupImage = document.querySelector('.popup__image');
    const imageSubtitle = popupImage.querySelector('.popup__subtitle');
    imageSubtitle.textContent = this._name;
    openPopupImage.setAttribute('src', this._link);
    openPopupImage.setAttribute('alt', this._name);
    popupOpen(popupImage);
  }
}
