const profileEditButton = document.querySelector('.profile__edit-button');
const profileFirstName = document.querySelector('.profile__first-name');
const profiletJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const popupBlock = document.querySelector('.popup_add');
const popupOpenBtn = document.querySelector('.profile__edit-button_popup');
const popupCloseBtn = popup.querySelector('.popup__close');

let formElement = popupBlock.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__first-name_title');
let jobInput = formElement.querySelector('.popup__job_subtitle');

function popupToggle() {
  popup.classList.toggle('popup_opened');
}
popupCloseBtn.addEventListener('click', popupToggle);
popupOpenBtn.addEventListener('click', popupToggle);


function setPopupInputValue() {
  nameInput.value = profileFirstName.textContent;
  jobInput.value = profiletJob.textContent;
}

function setFormTextValue() {
  profileFirstName.textContent = nameInput.value;
  profiletJob.textContent = jobInput.value;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  setFormTextValue();
  popup.classList.toggle('popup_opened');
}


profileEditButton.addEventListener('click', function () {
  setPopupInputValue()
});

formElement.addEventListener('submit', formSubmitHandler);
