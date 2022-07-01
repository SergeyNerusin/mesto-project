/* jshint esversion:6 */

import {listenKeyboard} from '../pages/index.js';


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

function closePopup(popupWindow){
  popupWindow.classList.remove('popup_opened');
  document.removeEventListener('keyup', listenKeyboard);
}

export {deleteClassError, openPopup, closePopup};
