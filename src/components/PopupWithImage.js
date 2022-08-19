/* jshint esversion: 6 */

/*
  ***Создайте класс PopupWithImage***
  Создайте класс PopupWithImage, который наследует от Popup.
  Этот класс должен перезаписывать родительский метод open(полиморфизм).
  В методе open класса PopupWithImage нужно вставлять в попап картинку
  с src изображения и подписью к картинке.
*/

import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(selectorPopup){
    super(selectorPopup);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__image-caption');
  }

  open(title, link){
    super.open();
    this._image.src = link;
    this._caption = title;
  }

  close(){
    super.close();
    this._image.src = '';
    this._caption = '';
  }
}

