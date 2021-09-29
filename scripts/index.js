const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const popupOpenBtn = document.querySelector('.profile__edit-button_popup');
const popupCloseBtn = popup.querySelector('.popup__close');

let nameInput = formElement.querySelector('.popup__input_profile_title');
let jobInput = formElement.querySelector('.popup__input_profile_subtitle');


function popupOpen() {
  popup.classList.add('popup_opened');
  setPopupInputValue();
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function setPopupInputValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function setFormTextValue() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  setFormTextValue();
  popupClose();
}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
