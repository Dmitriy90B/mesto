import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({link, name}) {
    this._element.querySelector('.popup__subtitle').textContent = name;
    this._cardImage = this._element.querySelector('.popup__image');
    this._cardImage.setAttribute('src', link);
    this._cardImage.setAttribute('alt', name);
    super.open();
  }
}
