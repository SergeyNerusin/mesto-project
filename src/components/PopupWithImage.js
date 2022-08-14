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
  constructor(){
    super();

  }
}
