/* jshint esversion: 6 */

import {cleanValueAddCard} from '../components/utils/utils.js';
import {page, btnProfileEdit, btnAddCard, profileName, profileProfession, popupModalProfile, popupModalCard, formEditProfile, nameInput, jobInput, formEditCard, nameCardInput, linkCardInput, initialCards, dataSelectorValid, elementCard} from '../components/utils/constants.js';
import {enableValidation, toggleButtonState} from '../components/validate.js';
import {createCard} from '../components/cards.js';
import {deleteClassError, openPopup, closePopup} from '../components/modal.js';

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

function listenPage(evt){
  switch (evt.target.classList[0]) {
      case 'popup':
      case 'popup__close':
             closePopup(evt.target.closest('.popup'));
             deleteClassError();
             break;
     default:
          console.log('Значение не определено');
           break;
  }
}

function listenKeyboard(evt){
  const popupOpen = page.querySelector('.popup_opened');
  if((evt.key === 'Escape') && popupOpen){
      cleanValueAddCard();
      deleteClassError();
      closePopup(page.querySelector('.popup_opened'));
    }
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

document.addEventListener('click', listenPage);

initialCards.forEach(function(element){
  const oneCardElement = createCard(element.link, element.name);
  addCard(oneCardElement);
});


export {listenKeyboard};
