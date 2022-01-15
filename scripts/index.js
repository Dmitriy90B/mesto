import {initialCards, validationConfig} from './utils.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
export {openPopup};

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupEdit = document.querySelector('.popup_type_edit');
const openPopupEdit  = document.querySelector('.profile__edit-button');
const popupFormSaves = popupEdit.querySelector('.popup__form_save');
const nameInput = popupFormSaves.querySelector('.popup__input_profile_title');
const jobInput = popupFormSaves.querySelector('.popup__input_profile_subtitle');
const popupAdd = document.querySelector('.popup_type_add');
const openPopupAdd = document.querySelector('.profile__add-button');
const popupFormCreates = document.querySelector('.popup__form_create');
const headingInput = document.querySelector('.popup__input_profile_heading');
const linkInput = document.querySelector('.popup__input_profile_link');
const cardList = document.querySelector('.elements__items');
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {    // открытие попап
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {   // закрытие попап
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function setPopupInputValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function setFormTextValue() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function profileSubmitHandler(evt) {
  evt.preventDefault();
  setFormTextValue();
  closePopup(popupEdit);
}

function getCard(initialCard) {
  const card = new Card(initialCard, '#card').getCard();
  return card;
}

function addCard(cardElement) {
  const createNewCard = getCard(cardElement);
  cardList.prepend(createNewCard);
}

initialCards.map(addCard);

function cardSubmitHandler (evt) {
  evt.preventDefault();
  const data = {
    name: headingInput.value,
    link: linkInput.value
  }
  addCard(data);
  formValidationAdd.resetValidation();
  closePopup(popupAdd);
}

const formValidationEdit = new FormValidator(validationConfig, popupFormSaves);
formValidationEdit.enableValidation();
const formValidationAdd = new FormValidator(validationConfig, popupFormCreates);
formValidationAdd.enableValidation();

openPopupEdit.addEventListener('click', () => {
  setPopupInputValue();
  openPopup(popupEdit);
});
popupFormSaves.addEventListener('submit', profileSubmitHandler);
openPopupAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  formValidationAdd.resetValidation();
});
popupFormCreates.addEventListener('submit', cardSubmitHandler);
