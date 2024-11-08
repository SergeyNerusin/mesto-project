/* jshint esversion: 6 */

/*
  ***Создайте класс PopupWithImage***
  Создайте класс PopupWithImage, который наследует от Popup.
  Этот класс должен перезаписывать родительский метод open(полиморфизм).
  В методе open класса PopupWithImage нужно вставлять в попап картинку
  с src изображения и подписью к картинке.
*/

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._modalWindow.querySelector('.popup__image');
    this._caption = this._modalWindow.querySelector('.popup__image-caption');
  }

  open(title, link) {
    super.openPopup();
    super.setEventListeners();
    this._image.src = link;
    this._image.alt = title;
    this._caption = title;
  }

  close() {
    super.closePopup();
    setTimeout(() => {
      this._image.src = '';
      this._image.alt = '';
      this._caption = '';
    }, 500);
  }
}
