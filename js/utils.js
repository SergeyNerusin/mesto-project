/*jshint esversion:6*/

import {formEditCard} from './modal.js';

function cleanValueAddCard(){
   formEditCard.reset();
}


function togglePopup(popupWindow){
  popupWindow.classList.toggle('popup_opened');
}

export {cleanValueAddCard, togglePopup};
