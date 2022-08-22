/* jshint esversion:6 */
export default class PopupWithEgrement extends Popup{
  constructor(selectorPopup, {submit}){
    super(selectorPopup);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', () => {
    this._submit(this._card, this._cardId);});

  }
}
