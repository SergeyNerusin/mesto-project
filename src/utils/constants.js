/* jshint esversion: 8 */

/* Данные селекторов для валидации форм */
export const dataSelectorValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

/* Данные селекторов формы профайла */
export const plofileSelectors = {
  profileName: '.profile__name',
  profileProfession: '.profile__profession',
  profileAvatar: '.profile__avatar'
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
const popupModalAgreement = document.querySelector('.popup__agreement');
const popupModalsCloses = document.querySelectorAll('.popup__close');
const popupOverleys = document.querySelectorAll('.popup');
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


