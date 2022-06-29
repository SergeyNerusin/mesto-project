/* jshint esversion:6 */

import {createCard, addCard} from './cards.js';

const imageModal = document.querySelector('.popup__card-image');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupModalProfile = document.querySelector('.popup__profile');
const popupModalCard = document.querySelector('.popup__card');

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

function submitAddcard (evt) {
  evt.preventDefault();
  const oneCardElement = createCard(linkCardInput.value, nameCardInput.value);
  addCard(oneCardElement);
  cleanValueAddCard();
  togglePopup(popupModalCard);
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

function openFotofromCard(linkImage, titleImage, altImage){
  imageModal.style = 'background-color: #000';
  imageModal.querySelector('.popup__image').src = linkImage;
  imageModal.querySelector('.popup__image').alt = altImage;
  imageModal.querySelector('.popup__image-caption').textContent = titleImage;
  togglePopup(imageModal);
}

function togglePopup(popupWindow){
  popupWindow.classList.toggle('popup_opened');
}

export {profileName, profileProfession, popupModalProfile, popupModalCard, formEditProfile, nameInput, jobInput, formEditCard, nameCardInput, linkCardInput, submitProfileform, submitAddcard, cleanValueAddCard, deleteClassError, openFotofromCard, togglePopup};
