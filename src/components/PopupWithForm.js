/* jshint esversion: 6 */

/*
  ***Создайте класс PopupWithForm***
  Создайте класс PopupWithForm, который наследуется от Popup.
  Этот класс:
  - кроме селектора попапа принимает в конструктор колбэк сабмита формы, в этом колбэке содержится метод класса Api.
  - содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  - перезаписывает родительский метод setEventListeners, метод setEventListeners класса PopupWithForm должен не только добавлять
    обработчик клика иконке закрытия,  но и добавлять обработчик сабмита формы.
  - перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.

  Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callbacksubmitApi){
    super(selectorPopup);
    this.callbacksubmitApi = callbacksubmitApi;
  }
   _getInputValues(){

   }

   setEventListeners(){
    super.setEventListeners();
   }

   close(){
    super.close();
   }
}

