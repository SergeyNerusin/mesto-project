/* jshint esversion: 6 */

import {cleanValueAddCard, togglePopup} from '../components/utils.js';
import {initialCards, dataSelectorValid} from '../components/data.js';
import {enableValidation, toggleButtonState} from '../components/validate.js';
import {createCard, addCard, putLikeHandler, deleteCardHandler, viewImagesfoto} from '../components/cards.js';
import {profileName, profileProfession, popupModalProfile, popupModalCard, formEditProfile, nameInput, jobInput, formEditCard, nameCardInput, linkCardInput, submitProfileform, submitAddcard, deleteClassError} from '../components/modal.js';

import './index.css';

const page = document.querySelector('.page');

function listenPage(evt){
  switch (evt.target.classList[0]) {
    case 'profile__edit':
          nameInput.value = profileName.textContent;
          jobInput.value = profileProfession.textContent;
          toggleButtonState(dataSelectorValid,[nameInput, jobInput],formEditProfile.querySelector('.popup__button'));
          togglePopup(popupModalProfile);
          page.addEventListener('keyup', listenKeyboard);
          break;
    case 'profile__button':
          cleanValueAddCard();
          toggleButtonState(dataSelectorValid,[nameCardInput, linkCardInput],formEditCard.querySelector('.popup__button'));
          togglePopup(popupModalCard);
          page.addEventListener('keyup', listenKeyboard);
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
          togglePopup(evt.target.closest('.popup'));
          deleteClassError();
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





