/* jshint esversion:6 */

const showInputError = (dataObj, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(dataObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dataObj.errorClass);
};

const hideInputError = (dataObj, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(dataObj.inputErrorClass);
  errorElement.classList.remove(dataObj.errorClass);
  errorElement.textContent = "";
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
         });
  };

const toggleButtonState = (dataObj, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(dataObj.inactiveButtonClass);
        buttonElement.setAttribute('disabled','');
      } else {
          buttonElement.classList.remove(dataObj.inactiveButtonClass);
          buttonElement.removeAttribute('disabled','');
    }
  };

const isValid = (dataObj, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
      showInputError( dataObj, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(dataObj, formElement, inputElement);
  }
};

const setEventListeners = (dataObj, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(dataObj.inputSelector));
  const buttonElement = formElement.querySelector(dataObj.submitButtonSelector);
  toggleButtonState(dataObj, inputList, buttonElement);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(dataObj, formElement, inputElement);
        toggleButtonState(dataObj, inputList, buttonElement);
      });
  });
};

const enableValidation = (dataObj) => {
  const formList = Array.from(document.querySelectorAll(dataObj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(dataObj, formElement);
  });
};


export {enableValidation, toggleButtonState};

