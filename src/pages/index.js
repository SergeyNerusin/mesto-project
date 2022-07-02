/* jshint esversion: 6 */

import {cleanValueAddCard} from '../utils/utils.js';
import {page, btnProfileEdit, btnAddCard, profileName, profileProfession, popupModalProfile, popupModalCard, formEditProfile, nameInput, jobInput, formEditCard, nameCardInput, linkCardInput, initialCards, dataSelectorValid, elementCard} from '../utils/constants.js';
import {enableValidation, toggleButtonState} from '../components/validate.js';
import {createCard} from '../components/cards.js';
import {deleteClassError, openPopup, closePopup, listenKeyboard} from '../components/modal.js';

import './index.css';

function openProfileEdit(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  toggleButtonState(dataSelectorValid,[nameInput, jobInput],formEditProfile.querySelector('.popup__button'));
  openPopup(popupModalProfile);
}

function openAddCard(){
  cleanValueAddCard();
  toggleButtonState(dataSelectorValid,[nameCardInput, linkCardInput],formEditCard.querySelector('.popup__button'));
  openPopup(popupModalCard);

}

function submitProfileform (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupModalProfile);
}

function submitAddcard (evt) {
  evt.preventDefault();
  const oneCardElement = createCard(linkCardInput.value, nameCardInput.value);
  addCard(oneCardElement);
  cleanValueAddCard();
  closePopup(popupModalCard);
}

function addCard(oneCard){
  elementCard.prepend(oneCard);
}

btnProfileEdit.addEventListener('click', openProfileEdit);
btnAddCard.addEventListener('click', openAddCard);


formEditProfile.addEventListener('submit', submitProfileform);
formEditCard.addEventListener('submit', submitAddcard);


enableValidation(dataSelectorValid);

initialCards.forEach(function(element){
  const oneCardElement = createCard(element.link, element.name);
  addCard(oneCardElement);
});


export {listenKeyboard};
