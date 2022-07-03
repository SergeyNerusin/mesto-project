/* jshint esversion:6 */

import {cleanValueAddCard} from '../utils/utils.js';

function deleteClassError(){
  const spanError = Array.from(document.querySelectorAll('.popup__input'));
  const inputError = Array.from(document.querySelectorAll('.popup__input-error'));
  spanError.forEach((element) => {
           element.classList.remove('popup__input_type_error');});
  inputError.forEach((element) => {
           element.classList.remove('popup__input-error_active');});
}

function openPopup(popupWindow){
  popupWindow.classList.add('popup_opened');
  document.addEventListener('keyup', listenKeyboard);
}

function clickCross(evt){
  if(evt.target.classList.contains('popup__close')){
    closePopup(document.querySelector('.popup_opened'));
    deleteClassError();
  }
}

function clickOverley(evt){
  if(evt.target.classList.contains('popup')){
    closePopup(document.querySelector('.popup_opened'));
    deleteClassError();
  }
}

function closePopup(popupWindow){
  popupWindow.classList.remove('popup_opened');
  document.removeEventListener('keyup', listenKeyboard);
}

function listenKeyboard(evt){
  const popupOpen = document.querySelector('.popup_opened');
  if((evt.key === 'Escape') && popupOpen){
      cleanValueAddCard();
      deleteClassError();
      closePopup(popupOpen);
    }
}

export {deleteClassError, openPopup, closePopup, listenKeyboard, clickCross, clickOverley};
