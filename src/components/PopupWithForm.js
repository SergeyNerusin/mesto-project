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
  constructor(selectorPopup, popupValidate, { callbackSubmit }) {
    super(selectorPopup);
    this._popupValidate = popupValidate;
    this._callbackSubmit = callbackSubmit;
    this._form = this._modalWindow.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitBtn = this._modalWindow.querySelector('.popup__button');
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });
    return inputValues;
  }

  renderSaveBtn(isLoading, text = 'Сохранить') {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = `${text}`;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupValidate.enableValidation();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderSaveBtn(true);
      const values = this._getInputValues();
      this._callbackSubmit(values, this.renderSaveBtn.bind(this));
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
    this._popupValidate.cleanValidError();
  }
}
