export class FormValidator {
  constructor(validationConfig, form) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._form = form;
  };

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((form) => this._addListenerToForm(form));
  };


  _addListenerToForm(form) {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = form.querySelector(this._submitButtonSelector);


    inputs.forEach((input) => {
      this._addListenerToInput(input)
    });

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButton(form, button);
    });

    form.addEventListener('input', (evt) => {
      this._toggleButton(evt.currentTarget, button);
    });

    this._toggleButton(form, button);
  };

  _toggleButton(form, button) {
    const isFormInvalid = !form.checkValidity();
    button.disabled = isFormInvalid;
    button.classList.toggle(this._inactiveButtonClass, isFormInvalid);
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
