/* jshint esversion: 8 */

import {getDataUser, pullDataUser, getInitialCards, pullAvatar, pullNewCard, deleteCard, putPullLike, deletePullLike} from '../components/api.js';
import {cleanValueForm} from '../utils/utils.js';
import { btnAvatarEdit, btnProfileEdit, btnAddCard, avatarUser, profileName, profileProfession, popupModalAvatar, popupModalProfile, popupModalCard, popupModalClose, popupOverley, formEditAvatar, avatarInput, formEditProfile, nameInput, jobInput, formAddCard, nameCardInput, linkCardInput, dataSelectorValid, elementCard} from '../utils/constants.js';
import {enableValidation, toggleButtonState} from '../components/validate.js';
import {createCard} from '../components/cards.js';
import {openPopup, closePopup, listenKeyboard, clickCross, clickOverley} from '../components/modal.js';

import './index.css';

/* id пользователя - получаем с сервера  */
let personId = "";

function openAvatarEdit(){
  cleanValueForm(formEditAvatar);
  toggleButtonState(dataSelectorValid, [avatarInput], formEditAvatar.querySelector('.popup__button'));
  openPopup(popupModalAvatar);
}

function openProfileEdit(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  toggleButtonState(dataSelectorValid,[nameInput, jobInput], formEditProfile.querySelector('.popup__button'));
  openPopup(popupModalProfile);
}

function openAddCard(){
  toggleButtonState(dataSelectorValid, [nameCardInput, linkCardInput], formAddCard.querySelector('.popup__button'));
  cleanValueForm(formAddCard);
  openPopup(popupModalCard);
}

function submitAvatarform (evt){
  evt.preventDefault();
  pullAvatar(avatarInput.value)
  .then(res => avatarUser.src = res.avatar);
  cleanValueForm(formEditAvatar);
  closePopup(popupModalAvatar);
}

function submitProfileform (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  pullDataUser(nameInput.value, jobInput.value)
  .tnen(console.log("Профиль:", res));
  closePopup(popupModalProfile);
}

function submitAddcard (evt) {
  evt.preventDefault();
  pullNewCard(nameCardInput.value, linkCardInput.value)
  .then(card => console.log(card));
  // const oneCardElement = createCard(linkCardInput.value, nameCardInput.value);
  // addCard(oneCardElement);
  cleanValueForm(formAddCard);
  closePopup(popupModalCard);
}

function addCard(oneCard){
  elementCard.prepend(oneCard);
}

function renderCard(cards){
  // cards - массив карточек полученных с сервера
  console.log(cards);
  cards.forEach(card => {
    // console.log('element:', card);
    const oneCardElement = createCard(card.link, card.name, card._id, card.likes.length);
    addCard(oneCardElement);
  });
}

Promise.all([getDataUser(), getInitialCards()])
.then(([dataUser, cards]) => {
    avatarUser.src =  dataUser.avatar;
    profileName.textContent = dataUser.name;
    profileProfession.textContent = dataUser.about;
    personId = dataUser._id;
    // dataUser - данные пользователя полученные с сервера
    console.log("DataUser", dataUser);
    renderCard(cards.reverse());
  })
  .catch(err => console.log(err));

btnAvatarEdit.addEventListener('click', openAvatarEdit);
btnProfileEdit.addEventListener('click', openProfileEdit);
btnAddCard.addEventListener('click', openAddCard);

popupModalClose.forEach(el => el.addEventListener('click', clickCross));
popupOverley.forEach(el => el.addEventListener('click', clickOverley));

formEditAvatar.addEventListener('submit', submitAvatarform);
formEditProfile.addEventListener('submit', submitProfileform);
formAddCard.addEventListener('submit', submitAddcard);

enableValidation(dataSelectorValid);


export {listenKeyboard};
