export class FormValidator {
  constructor(validationConfig, form, button, inputs) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector; // +++
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass; // +++
    this._form = form;
    this._button = button;
    this._inputs = inputs;
  };

  enableValidation() {
    this._addListenerToForm();
  };

  _addListenerToForm() {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);

    this._inputs.forEach((input) => {
      this._addListenerToInput(input)
    });

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButton();
    });

    this._form.addEventListener('input', (evt) => {
      this._toggleButton(evt.currentTarget);
    });

    this._toggleButton();
  };

  resetValidation() {
    this._form.reset();
    this._toggleButton();
  }

  _toggleButton() {
    const isFormInvalid = !this._form.checkValidity();
    this._button.disabled = isFormInvalid;
    this._button.classList.toggle(this._inactiveButtonClass, isFormInvalid);
  };

  _addListenerToInput(input) {
    input.addEventListener('input', (evt) => {
      this._hadleFieldValidation(evt);
    });
  };

  _hadleFieldValidation(evt) {
    const element = evt.target;
    const errorContainer = document.querySelector(`#${element.id}-error`);

    if (!element.validity.valid) {
      element.classList.add(this._inputErrorClass);
    } else {
      element.classList.remove(this._inputErrorClass);
    }
    errorContainer.textContent = element.validationMessage;
  };
}
