/* jshint esversion: 6 */

/*
  Создайте класс Popup
  Создайте класс Popup, который отвечает за открытие и закрытие попапа.
  Этот класс:
  - принимает в конструктор единственный параметр — селектор попапа.
  - содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  - содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  - содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
    Модальное окно также закрывается при клике на затемнённую область вокруг формы.
*/

export default class Popup {
  constructor(selectorPopup){
    this._popup = selectorPopup;
    this._modalWindow = document.querySelector(this._popup);
    this._closeWindow = this._modalWindow.querySelector('.popup__close');
  }

  _hendleEscClose(evt){
    if(evt.key === "Escape") {
      this.close(); }
  }

  _hendleCloseOverlay(evt){
     const openPopup = evt.target.closest('.popup_opened');
     if(evt.target.classList.contains('popup') && openPopup){
     this.closePopup();
  }
  }

  setEventListeners(){
    this._closeWindow.addEventListener('click',() => { close(); });

  }

  open(){
    this._modalWindow.classList.add('popup_opened');
    document.addEventListener('keyup', this._hendleEscClose);
  }

  close(){
    this._modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }
}
