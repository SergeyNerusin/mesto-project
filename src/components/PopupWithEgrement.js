/* jshint esversion:6 */

import Popup from './Popup.js';
export default class PopupWithEgrement extends Popup {
  constructor(selectorPopup, { submit }) {
    super(selectorPopup);
    this._submit = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalWindow
      .querySelector('.popup__button')
      .addEventListener('click', () => this._submit());
  }
}
