/* jshint esversion: 8 */


/*Данные для входа на сервер*/
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'c6c844d5-a2d0-4fc9-b884-37783e126543',
    'Content-Type': 'application/json'
  }
};

/* Данные селкторов для валидации форм */
const dataSelectorValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const btnAvatarEdit = document.querySelector('.profile__btn-avatar');
const btnProfileEdit = document.querySelector('.profile__edit');
const btnAddCard = document.querySelector('.profile__button');
const avatarUser = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupModalAvatar = document.querySelector('.popup__avatar');
const popupModalProfile = document.querySelector('.popup__profile');
const popupModalCard = document.querySelector('.popup__card');
const popupModalAgreement =document.querySelector('.popup__agreement');
const popupModalClose = document.querySelectorAll('.popup__close');
const popupOverley = document.querySelectorAll('.popup');
const imageModal = document.querySelector('.popup__card-image');
const picture = document.querySelector('.popup__image');
const pictureName = document.querySelector('.popup__image-caption');
const formEditAvatar = document.forms.formAvatar;
const avatarInput = formEditAvatar.elements.avatar;
const formEditProfile = document.forms.formProfile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.profession;
const formAddCard = document.forms.formCard;
const nameCardInput = formAddCard.elements.card;
const linkCardInput = formAddCard.elements.link;
const elementCard = document.querySelector('.cards');
const template = document.querySelector('#oneCard').content;



export {config, btnAvatarEdit, btnProfileEdit, btnAddCard, avatarUser, profileName, profileProfession, popupModalAvatar, popupModalProfile, popupModalCard, popupModalAgreement, popupModalClose, popupOverley, imageModal, picture, pictureName, formEditAvatar, avatarInput,  formEditProfile, nameInput, jobInput, formAddCard, nameCardInput, linkCardInput, dataSelectorValid, elementCard, template};
