import './index.css';
import {validationConfig} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const openPopupEdit  = document.querySelector('.profile__edit-button');
const openPopupAdd = document.querySelector('.profile__add-button');
const openPopupAvatar = document.querySelector('.profile__avatar-button');
const profileNameInput = document.querySelector('.popup__input_profile_title');
const profileJobInput = document.querySelector('.popup__input_profile_subtitle');
const cardList = document.querySelector('.elements__items');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '91bab0a1-95f4-4e2c-8186-9f03ec8012a1',
    'Content-Type': 'application/json'
  }
});

let userId;
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about
    });
    userInfo.setUserAvatar({
      avatar: userData.avatar
    });
    defaultCardList.renderer(cards);
  })
  .catch(err => console.log(`Ошибка: ${err}`));

function createCard(initialCards) {
    const card = new Card({
    data: {...initialCards, userId: userId},

    handleCardClick: (item) => {
      popupWithImage.open(item);
    },
    handleLikeClick: (card) => {
      if (card.likeById()) {
        api.deleteLike(card.cardId())
          .then(res => card.checkYourLikes(res))
          .catch(err => console.log(`Ошибка на отмену лайка: ${err}`));

      } else {
        api.addLike(card.cardId())
          .then(res => card.checkYourLikes(res))
          .catch(err => console.log(`Ошибка лайка: ${err}`));
      }
    },
    handleDeleteIconClick: (card) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setSubmitHandlerChange(() => {
        api.deleteByTrash(card.cardId())
          .then(() => {
            card.deleteByTrash();
            popupWithConfirmation.close();
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
        userInfo.setUserInfo({
          name: item.name,
          job: item.about
        });
        popupEditForm.close();
        formValidationEdit.toggleButtonState();
      })
      .catch(err => console.log(`Ошибка при изменении данных пользователя: ${err}`))
      .finally(() => popupEditForm.getLoadingSave(false));
  }
});
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data) => {
    popupAddForm.getLoadingSave(true);
    api.addCard(data)
      .then((initialCards) => {
        defaultCardList.addItem(createCard(initialCards));
        popupAddForm.close();
        formValidationAdd.toggleButtonState();
      })
      .catch(err => console.log(`Ошибка при создание карточки: ${err}`))
      .finally(() => popupAddForm.getLoadingSave(false));
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
        formValidationAvatar.toggleButtonState();
      })
      .catch(err => console.log(`Ошибка при изменени на аватар: ${err}`))
      .finally(() => popupAvatarForm.getLoadingSave(false));
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
