/* jshint esversion: 8 */

export const containerCard = document.querySelector('.cards'); // контайнер для отрисовки карточек
export const template = document.querySelector('#oneCard').content;

/*Данные для входа на сервер*/
export const configApi = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'c6c844d5-a2d0-4fc9-b884-37783e126543',
    'Content-Type': 'application/json',
  },
};

/* Данные селекторов для валидации форм */
export const dataSelectorsValid = {
  formSelector: '.popup',
  inputsSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

/* Данные селекторов формы профайла */
export const profileSelectors = {
  profileName: '.profile__name',
  profileProfession: '.profile__profession',
  profileAvatar: '.profile__avatar',
};

/* Селектора модальных окон */
export const popupSelectors = {
  popupAvatar: '.popup__avatar',
  popupProfile: '.popup__profile',
  popupAddCard: '.popup__card',
  popupShowImage: '.popup__card-image',
  popupEgreement: '.popup__agreement',
};

export const btnProfileEdit = document.querySelector('.profile__edit');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const btnAddCard = document.querySelector('.profile__button');
export const btnAvatarEdit = document.querySelector('.profile__btn-avatar');
const formEditProfile = document.forms.formProfile;
export const nameInput = formEditProfile.elements.name;
export const jobInput = formEditProfile.elements.profession;
