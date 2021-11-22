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
const popupImage = document.querySelector('.popup_type_image');
const openPopupImage = document.querySelector('.popup__image');
const imageSubtitle = popupImage.querySelector('.popup__subtitle');
const headingInput = document.querySelector('.popup__input_profile_heading');
const linkInput = document.querySelector('.popup__input_profile_link');
const cardId = document.querySelector('#card');
const cardList = document.querySelector('.elements__items');
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      popupClose(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      popupClose(popup)
    }
  })
})

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    popupClose(openedPopup);
  }
}

function popupOpen(popup) {    // открытие попап
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function popupClose(popup) {   // закрытие попап
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
  popupClose(popupEdit);
}

function openImage(imageElement) {
  imageSubtitle.textContent = imageElement.name;
  openPopupImage.setAttribute('src', imageElement.link);
  openPopupImage.setAttribute('alt', imageElement.name);
  popupOpen(popupImage);
}

function getCard(cardElement) {
  const getCardElement = cardId.content.cloneNode(true);
  getCardElement.querySelector('.elements__title').textContent = cardElement.name;
  const elementsItem = getCardElement.querySelector('.elements__item');
  elementsItem.src = cardElement.link;
  elementsItem.alt = cardElement.name;
  elementsItem.addEventListener('click', () => openImage(cardElement));

  const likeCard = getCardElement.querySelector('.elements__like');
  likeCard.addEventListener('click', () => {
    likeToggle(likeCard);
  });

  const cardTrash = getCardElement.querySelector('.elements__trash');
  cardTrash.addEventListener('click', () => {
  const card = cardTrash.closest('.elements__position');
    card.remove();
  });

  return getCardElement;
}

function createCard(cardElement) {
  const createNewCard = getCard(cardElement);
  cardList.prepend(createNewCard);
}

function likeToggle(likeCard) {
  likeCard.classList.toggle('elements__like_active');
}

initialCards.map(createCard);

function cardSubmitHandler (evt) {
  evt.preventDefault();
  const data = {
    name: headingInput.value,
    link: linkInput.value
  }

  createCard(data);
  evt.currentTarget.reset();

  const buttonAddDisabled = popupAdd.querySelector('.popup__save-button');
  buttonAddDisabled.disabled = true;
  buttonAddDisabled.classList.add(validationConfig.inactiveButtonClass);
  popupClose(popupAdd);
}


openPopupEdit.addEventListener('click', () => {
  setPopupInputValue(); popupOpen(popupEdit);
});
popupFormSaves.addEventListener('submit', profileSubmitHandler);
openPopupAdd.addEventListener('click', () => popupOpen(popupAdd));
popupFormCreates.addEventListener('submit', cardSubmitHandler);
