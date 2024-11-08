/* jshint esversion: 6 */

/*
  Создайте класс Popup,
  который отвечает за открытие и закрытие попапа.
  Этот класс:
  - принимает в конструктор единственный параметр — селектор попапа.
  - содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  - содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  - содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
    Модальное окно также закрывается при клике на затемнённую область вокруг формы.
*/

export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._modalWindow = document.querySelector(this._selectorPopup);
    this._closeWindow = this._modalWindow.querySelector('.popup__close');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleCloseOverlay(evt) {
    const openPopup = evt.target.closest('.popup_opened');
    if (evt.target.classList.contains('popup') && openPopup) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeWindow.addEventListener('click', () => this.closePopup());
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
    this._modalWindow.addEventListener('click', (evt) =>
      this._handleCloseOverlay(evt)
    );
  }

  openPopup() {
    this._modalWindow.classList.add('popup_opened');
    this.setEventListeners();
  }

  closePopup() {
    this._modalWindow.classList.remove('popup_opened');
    this._modalWindow.removeEventListener('click', this._handleCloseOverlay);
    document.removeEventListener('keyup', this._handleEscClose);
  }
}
