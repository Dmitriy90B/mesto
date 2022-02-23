import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._element.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__input'); // достаём все элементы полей
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  setEventListeners(evt) {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    
    super.setEventListeners(evt);
  };

  close() {
    this._formSelector.reset();
    super.close()
  };
}
