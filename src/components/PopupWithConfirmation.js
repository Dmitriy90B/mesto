import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
  }

  setEventListeners() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });

    super.setEventListeners();
  };

  setSubmitHandlerChange(handlerChange) {
    this._handleFormSubmit = handlerChange;
  }
}
