/* jshint esversion: 6 */

/* Объект с данными карточек для вывода при открытии сайта по умолчанию */
const initialCards = [
  { name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  { name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  { name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  { name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  { name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
];

/* Данные селкторов для валидации форм */
const dataSelectorValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const page = document.querySelector('.page');
const btnProfileEdit = document.querySelector('.profile__edit');
const btnAddCard = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupModalProfile = document.querySelector('.popup__profile');
const popupModalCard = document.querySelector('.popup__card');
const imageModal = document.querySelector('.popup__card-image');
const picture = document.querySelector('.popup__image');
const pictureName = document.querySelector('.popup__image-caption');
const formEditProfile = document.forms.formProfile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.profession;
const formEditCard = document.forms.formCard;
const nameCardInput = formEditCard.elements.card;
const linkCardInput = formEditCard.elements.link;
const elementCard = document.querySelector('.cards');
const template = document.querySelector('#oneCard').content;


export {page, btnProfileEdit, btnAddCard, profileName, profileProfession, popupModalProfile, popupModalCard,  imageModal,  picture, pictureName, formEditProfile, nameInput, jobInput, formEditCard, nameCardInput, linkCardInput, initialCards, dataSelectorValid, elementCard, template};
