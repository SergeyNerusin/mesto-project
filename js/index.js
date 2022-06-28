/* jshint esversion: 6 */

import {initialCards, dataSelectorValid} from './data.js';
import {enableValidation, toggleButtonState} from './validateform.js';

const page = document.querySelector('.page');

const popupModalProfile = document.querySelector('.popup__profile');
const popupModalCard = document.querySelector('.popup__card');
const elementCard = document.querySelector('.cards');
const template = document.querySelector('#oneCard').content;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const imageModal = document.querySelector('.popup__card-image');

const formEditProfile = document.forms.formProfile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.profession;
const formEditCard = document.forms.formCard;
const nameCardInput = formEditCard.elements.card;
const linkCardInput = formEditCard.elements.link;

function submitProfileform (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  togglePopup(popupModalProfile);
}

function cleanValueAddCard(){
   formEditCard.reset();
}

function deleteClassError(){
  const spanError = Array.from(document.querySelectorAll('.popup__input'));
  const inputError = Array.from(document.querySelectorAll('.popup__input-error'));
  spanError.forEach((element) => {
           element.classList.remove('popup__input_type_error');});
  inputError.forEach((element) => {
           element.classList.remove('popup__input-error_active');});
}

function submitAddcard (evt) {
  evt.preventDefault();
  const oneCardElement = createCard(linkCardInput.value, nameCardInput.value);
  addCard(oneCardElement);
  cleanValueAddCard();
  togglePopup(popupModalCard);
}

function togglePopup(popupWindow){
  popupWindow.classList.toggle('popup_opened');
}

function createCard(cardLink, cardName) {
  const oneCard = template.querySelector('.cards__item').cloneNode(true);
  const selectorImage = oneCard.querySelector('.cards__image');
  const selectorTrash = oneCard.querySelector('.cards__trash');
  const selectorLike = oneCard.querySelector('.cards__like');
  const selectorTitle = oneCard.querySelector('.cards__title');
  selectorImage.src = cardLink;
  selectorImage.alt = `Изображение: ${cardName}`;
  selectorTrash.alt ='Изображение: Корзина';
  selectorTrash.title ='Удалить карточку';
  selectorTrash.src = './images/trash.svg';
  selectorLike.title = 'Поставить отметку: Нравится';
  selectorTitle.textContent = cardName;
  return oneCard;
}

function addCard(oneCard){
  elementCard.prepend(oneCard);
}

function putLikeHandler(cardLike) {
  cardLike.classList.toggle('cards__like_active');
}

function deleteCardHandler(trashCard) {
    const card = trashCard.closest('.cards__item');
    card.remove();
}

function openFotofromCard(linkImage, titleImage, altImage){
  imageModal.style = 'background-color: #000';
  imageModal.querySelector('.popup__image').src = linkImage;
  imageModal.querySelector('.popup__image').alt = altImage;
  imageModal.querySelector('.popup__image-caption').textContent = titleImage;
  togglePopup(imageModal);
}

function viewImagesfoto(clickObject){
    const card = clickObject.closest('.cards__item');
    const linkImage = card.querySelector('.cards__image').getAttribute('src');
    const altImage = card.querySelector('.cards__image').getAttribute('alt');
    const titleImage = card.querySelector('.cards__title').textContent;
    openFotofromCard(linkImage, titleImage, altImage);
}


function listenPage(evt){
  switch (evt.target.classList[0]) {
    case 'profile__edit':
          nameInput.value = profileName.textContent;
          jobInput.value = profileProfession.textContent;
          toggleButtonState(dataSelectorValid,[nameInput, jobInput],formEditProfile.querySelector('.popup__button'));
          page.addEventListener('keyup', listenKeyboard);
          togglePopup(popupModalProfile);
          break;
    case 'profile__button':
          page.addEventListener('keyup', listenKeyboard);
          cleanValueAddCard();
          togglePopup(popupModalCard);
          break;
    case 'cards__image':
          page.addEventListener('keyup', listenKeyboard);
          viewImagesfoto(evt.target);
          break;
    case 'cards__trash':
          deleteCardHandler(evt.target);
          break;
    case 'cards__like':
          putLikeHandler(evt.target);
          break;
    case 'popup':
    case 'popup__close':
          page.removeEventListener('keyup', listenKeyboard);
          deleteClassError();
          togglePopup(evt.target.closest('.popup'));
          break;
    default:
          console.log('Значение не определено');
          break;
  }
}

function listenKeyboard(evt){
  const window = Boolean(page.querySelector('.popup_opened'));
  if((evt.key === 'Escape') && window){
      cleanValueAddCard();
      deleteClassError();
      togglePopup(page.querySelector('.popup_opened'));
    }
}

formEditProfile.addEventListener('submit', submitProfileform);
formEditCard.addEventListener('submit', submitAddcard);


enableValidation(dataSelectorValid);

page.addEventListener('click', listenPage);

initialCards.forEach(function(element){
  const oneCardElement = createCard(element.link, element.name);
  addCard(oneCardElement);
});





