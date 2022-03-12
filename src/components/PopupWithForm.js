import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._element.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._buttonSelector = this._element.querySelector('.popup__save-button');
    this._buttonDefault  = this._buttonSelector.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  getLoadingSave(loadingSave) {
    if (!loadingSave) {
      this._buttonSelector.textContent = 'Сохранение...';
    } else {
      this._buttonSelector.textContent = this._buttonDefault;
    }
  }

  setEventListeners(evt) {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners(evt);
  };

  close() {
    this._formSelector.reset();
    super.close();
  };
}
