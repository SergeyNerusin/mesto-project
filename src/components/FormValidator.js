/* jshint esversion:6 */

/*
  Создание класса FormValidator
  Создайте класс FormValidator, который настраивает валидацию полей формы:
  - принимает в конструктор объект настроек с селекторами и классами формы;
  - принимает вторым параметром элемент той формы, которая валидируется;
  - имеет приватные методы, которые обрабатывают форму:
          - проверяют валидность поля,
          - изменяют состояние кнопки сабмита,
          - устанавливают все обработчики;
  - имеет публичный метод enableValidation, который включает валидацию формы.

  Для каждой проверяемой формы создавайте экземпляр класса FormValidator.
*/

export default class FormValidator{
  constructor(dataObj, formElement){
   this._form = formElement; // форма которая валидируется
   this._inputEror = dataObj.inputErrorClass; // добавление класса подсветки бордера инпута при ошибке ввода
   this._showError = dataObj.errorClass; // селектор ошибки - показать ошибку.
   this._btnInactive = dataObj.inactiveButtonClass; // добавочный класс кнопки меняет цвет кнопки в зависимости от активная/неактивная
   this._inputList = Array.from(this._form.querySelectorAll(this._dataObj.inputSelector)); // поля ввода формы которые будут валидироваться
   this._buttonElement = this._form.querySelector(this._dataObj.submitButtonSelector); // кнопка отправки сообщения
  }

  _showInputError(inputElement, errorMessage){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputEror);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._showError);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputEror);
    errorElement.classList.remove(this._showError);
    errorElement.textContent = '';
  }

  _hasInvalidInput(){
      return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState(){
    if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._btnInactive);
        this._buttonElement.setAttribute('disabled','');
      } else {
          this._buttonElement.classList.remove(this._btnInactive);
          this._buttonElement.removeAttribute('disabled','');
    }
  }

  _isValid(inputElement){
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
          this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          isValid(inputElement);
          this._toggleButtonState();
        });
    });
  }

  cleanValidError() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._hideInputError(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation(){
      this._setEventListeners();
    }
}
