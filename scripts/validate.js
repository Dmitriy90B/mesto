const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error'
};

enableValidation(validationConfig);

function enableValidation() {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

  forms.forEach(addListenerToForm);
};

function addListenerToForm(form) {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  inputs.forEach(addListenerToInput);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    toggleButton(form, button);

  });

  form.addEventListener('input', (evt) => {
    toggleButton(evt.currentTarget, button);
  });

  toggleButton(form, button);
};

function toggleButton(form, button) {
  const isFormInvalid = !form.checkValidity();

  button.disabled = isFormInvalid;
  button.classList.toggle(validationConfig.inactiveButtonClass, isFormInvalid);
};

function addListenerToInput(input) {
  input.addEventListener('input', hadleFieldValidation);
};

function hadleFieldValidation(evt) {
  const element = evt.target;
  const errorContainer = document.querySelector(`#${element.id}-error`);

  if(!element.validity.valid) {
    element.classList.add(validationConfig.inputErrorClass);
  } else {
    element.classList.remove(validationConfig.inputErrorClass);
  }
  errorContainer.textContent = element.validationMessage;
};
