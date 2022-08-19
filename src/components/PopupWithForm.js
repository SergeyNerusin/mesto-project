/* jshint esversion: 6 */

/*
  ***Создайте класс PopupWithForm***
  Создайте класс PopupWithForm, который наследуется от Popup.
  Этот класс:
  - кроме селектора попапа принимает в конструктор колбэк сабмита формы, в этом колбэке содержится метод класса Api.
  - содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  - перезаписывает родительский метод setEventListeners, метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,  но и добавлять обработчик сабмита формы.
  - перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.

  Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callbacksubmit){
    super(selectorPopup);
    this._callbacksubmit = callbacksubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitBtn = this._popup.querySelector('.popup__button');
  }
  _getInputValues(){
    const inputValues = {};
    this._inputList.forEach(inputElement => {
      inputValues[inputElement.name] = inputElement.value;
    });
     return inputValues;
  }

  _renderSaveBtn(isLoading, text=""){
     if(isLoading){
        this._submitBtn.textContent = "Сохранение...";
     } else {
        this._submitBtn.textContent = `${text}`;
     }
  }

   setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    this._renderSaveBtn(true);
    this._callbacksubmit(this._getInputValues())
     .then(() => this.close())
     .catch(err => console.log(err))
     .finally(() => this._renderSaveBtn(false, 'Сохранить'));
    });
  }

   close(){
    super.close();
    this._form.reset();
   }
}

