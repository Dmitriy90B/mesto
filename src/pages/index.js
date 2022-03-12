import './index.css';
import {validationConfig} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

const openPopupEdit  = document.querySelector('.profile__edit-button');
const openPopupAdd = document.querySelector('.profile__add-button');
const openPopupAvatar = document.querySelector('.profile__avatar-button');
const profileNameInput = document.querySelector('.popup__input_profile_title');
const profileJobInput = document.querySelector('.popup__input_profile_subtitle');
const cardList = document.querySelector('.elements__items');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: 'e4ee2037-6e1d-4a6c-990c-3cb9c7537a60',
    'Content-Type': 'application/json'
  }
});

let userId;
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    defaultCardList.renderer(initialCards);
  })
  .catch(err => console.log(`Ошибка: ${err}`));

function createCard(data) {
    const card = new Card({
    data: data,
    userId: userId,
    handleCardClick: (item) => {
      popupWithImage.open(item);
    },
    handleAddLikeClick: (card) => {
      api.addLike(card)
        .then((data) => {
          card.checkYourLikes(data);
        })
        .catch(err => console.log(`Ошибка при добавление лайка: ${err}`));
    },
    handleDeleteLikeClick: (card) => {
      api.deleteLike(card)
        .then((data) => {
          card.checkYourLikes(data);
        })
        .catch(err => console.log(`Ошибка на отмену лайка: ${err}`));
    },
    handleDeleteIconClick: (card) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setSubmitHandlerChange(() => {
        api.deleteCard(card)
          .then(() => {
            popupWithConfirmation.close();
            card.deleteByTrash();
          })
          .catch(err => console.log(`Ошибка при клике на корзину: ${err}`));
      });
    }

  }, '#card').getCard();
  return card;
};

const defaultCardList = new Section({
  renderer: (item) => {
    const cards = createCard(item);
    defaultCardList.addItem(cards);
  }
}, cardList);
// defaultCardList.renderer();

const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileJob: '.profile__job',
  profileAvatar: '.profile__avatar'
});

const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (item) => {
    popupEditForm.getLoadingSave(true);
    api.replaceUserInfo(item)
      .then((item) => {
        userInfo.setUserInfo(item);
        popupEditForm.close();
      })
      .catch(err => console.log(`Ошибка при изменении данных пользователя: ${err}`))
      .finally(() => popupEditForm.getLoadingSave(false));
    formValidationEdit.toggleButtonState();
  }
});
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data) => {
    popupAddForm.getLoadingSave(true);
    api.addCard(data)
      .then((data) => { // data
        defaultCardList.addItem(createCard({
          link: data.link,
          name: data.heading
        }));
        popupAddForm.close();
      })
      .catch(err => console.log(`Ошибка при создание карточки: ${err}`))
      .finally(() => popupAddForm.getLoadingSave(false));
    formValidationAdd.toggleButtonState();
  }
});
popupAddForm.setEventListeners();

const popupAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (item) => {
    popupAvatarForm.getLoadingSave(true);
    api.replaceAvatar(item)
      .then((item) => {
        userInfo.setUserAvatar(item);
        popupAvatarForm.close();
      })
      .catch(err => console.log(`Ошибка при изменени на аватар: ${err}`))
      .finally(() => popupAvatarForm.getLoadingSave(false));
    formValidationAvatar.toggleButtonState();
  }
});
popupAvatarForm.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete',
});
popupWithConfirmation.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const formValidationEdit = new FormValidator(validationConfig, '.popup_type_edit');
formValidationEdit.enableValidation();

const formValidationAdd = new FormValidator(validationConfig, '.popup_type_add');
formValidationAdd.enableValidation();

const formValidationAvatar = new FormValidator(validationConfig, '.popup_type_avatar');
formValidationAvatar.enableValidation();

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

openPopupAvatar.addEventListener('click', () => {
  popupAvatarForm.open();
  formValidationAvatar.resetValidation();
});
