import './index.css';
import {initialCards, validationConfig} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const openPopupEdit  = document.querySelector('.profile__edit-button');
const openPopupAdd = document.querySelector('.profile__add-button');
const profileNameInput = document.querySelector('.popup__input_profile_title');
const profileJobInput = document.querySelector('.popup__input_profile_subtitle');
const cardList = document.querySelector('.elements__items');

function createCard(initialCards) {
  const card = new Card({
    data: initialCards,
    handleCardClick: (item) => {
      popupWithImage.open(item);
    }
  }, '#card').getCard();
  return card;
};

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cards = createCard(item);
    defaultCardList.addItem(cards);
  }
}, cardList);
defaultCardList.renderer();

const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileJob: '.profile__job'
});

const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item);
    popupEditForm.close();
    formValidationEdit.toggleButtonState();
  }
});
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data) => {
    defaultCardList.addItem(createCard({
      link: data.link,
      name: data.heading
    }));
    popupAddForm.close();
    formValidationAdd.toggleButtonState();
  }
});
popupAddForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const formValidationEdit = new FormValidator(validationConfig, '.popup_type_edit');
formValidationEdit.enableValidation();

const formValidationAdd = new FormValidator(validationConfig, '.popup_type_add');
formValidationAdd.enableValidation();

openPopupEdit.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  profileNameInput.value = userInfoData.name;
  profileJobInput.value = userInfoData.job;
  popupEditForm.open();
  formValidationEdit.resetValidation();
});

openPopupAdd.addEventListener('click', () => {
  popupAddForm.open();
  formValidationAdd.resetValidation();
});
