const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupEdit = document.querySelector('.popup_type_edit');
const formElement = popupEdit.querySelector('.popup__form');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = popupEdit.querySelector('.popup__close');

const popupAdd = document.querySelector('.popup_type_add');
const popupAddOpenBtn = document.querySelector('.profile__add-button');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close');
const formElementSave = document.querySelector('.popup__form_save');

const popupImage = document.querySelector('.popup_type_image');
const popupImageOpen = document.querySelector('.popup__image');
const popupImageClose = popupImage.querySelector('.popup__close');

const cardId = document.querySelector('#card');
const cardList = document.querySelector('.elements__items');

let nameInput = formElement.querySelector('.popup__input_profile_title');
let jobInput = formElement.querySelector('.popup__input_profile_subtitle');

function popupOpen() {    // открытие попап для редактирования
  popupEdit.classList.add('popup_opened');
  setPopupInputValue();
}

function popupClose() {
  popupEdit.classList.remove('popup_opened');
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

function popupOpenAdd() {   // открытия попоп для создание карточки
  popupAdd.classList.add('popup_opened');

}

function popupCloseAdd() {
  popupAdd.classList.remove('popup_opened');

}

function openImage(imageElement) {    // открытия попап для просмотра карточек
  popupImage.querySelector('.popup__subtitle').textContent = imageElement.name;
  popupImageOpen.setAttribute('src', imageElement.link);
  popupImage.classList.add('popup_opened');
}

function closeImage() {
  popupImage.classList.remove('popup_opened')
}

function openElements(cardElement) {    // список initialCards
  const createСard = cardId.content.cloneNode(true);
  createСard.querySelector('.elements__title').textContent = cardElement.name;
  createСard.querySelector('.elements__item').setAttribute('src', cardElement.link);
  createСard.querySelector('.elements__item').addEventListener('click', () => {
    openImage(cardElement);
  });

  const likeCard = createСard.querySelector('.elements__like');
  likeCard.addEventListener('click', () => {    // лайк карточки
    likeToggle(likeCard);
  });

  setListenerCard(createСard);
  cardList.prepend(createСard);
}

function likeToggle(likeCard) {
  likeCard.classList.toggle('elements__like_active');
}

initialCards.map(openElements);

function formSubmitCards(evt) {   // создание карточки
  evt.preventDefault();
  const data = {
    name: document.querySelector('.popup__input_profile_heading').value,
    link: document.querySelector('.popup__input_profile_link').value
  }

  openElements(data);
  evt.currentTarget.reset();
  popupCloseAdd();
}

function deleteCard(evt) {    // удаление карточки
  const card = evt.currentTarget.closest('.elements__position');
  card.remove();
}

function setListenerCard(card) {
  card.querySelector('.elements__trash').addEventListener('click', deleteCard);
}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
popupAddOpenBtn.addEventListener('click', popupOpenAdd);
popupAddCloseBtn.addEventListener('click', popupCloseAdd);
popupImageClose.addEventListener('click', closeImage);
formElementSave.addEventListener('submit', formSubmitCards);
