/* jshint esversion:6 */

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
  const openPopup = evt.target.closest('.popup_opened');
  if(evt.target.classList.contains('popup__close') && openPopup){
    closePopup(openPopup);
  }
}

function clickOverley(evt){
  const openPopup = evt.target.closest('.popup_opened');
  if(evt.target.classList.contains('popup') && openPopup){
    closePopup(openPopup);
  }
}

function closePopup(popupWindow){
  popupWindow.classList.remove('popup_opened');
  document.removeEventListener('keyup', listenKeyboard);
}

function listenKeyboard(evt){
  if(evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
}

export {deleteClassError, openPopup, closePopup, listenKeyboard, clickCross, clickOverley};
