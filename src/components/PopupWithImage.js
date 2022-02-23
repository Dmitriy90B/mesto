import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._element.querySelector('.popup__image');
    this._title = this._element.querySelector('.popup__subtitle');
  }

  open({link, name}) {
    this._title.textContent = name;
    this._cardImage.setAttribute('src', link);
    this._cardImage.setAttribute('alt', name);
    super.open();
  }
}
