/* jshint esversion: 8 */

import {getDataUser, pullDataUser, getInitialCards, pullAvatar, pullNewCard} from '../components/api.js';
import {cleanValueForm} from '../utils/utils.js';
import { btnAvatarEdit, btnProfileEdit, btnAddCard, avatarUser, profileName, profileProfession, popupModalAvatar, popupModalProfile, popupModalCard, popupModalsCloses, popupOverleys, formEditAvatar, avatarInput, formEditProfile, nameInput, jobInput, formAddCard, nameCardInput, linkCardInput, dataSelectorValid, elementCard} from '../utils/constants.js';
import {enableValidation, toggleButtonState} from '../components/validate.js';
import {createCard} from '../components/cards.js';
import {openPopup, closePopup, listenKeyboard, clickCross, clickOverley} from '../components/modal.js';

import './index.css';

/* id пользователя - получаем с сервера  */
let personId = "";

/* открытие попапа редактирования аватарки */
function openAvatarEdit(){
  cleanValueForm(formEditAvatar);
  toggleButtonState(dataSelectorValid, [avatarInput], formEditAvatar.querySelector('.popup__button'));
  openPopup(popupModalAvatar);
}

/* открытие попапа редактирования профиля */
function openProfileEdit(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  toggleButtonState(dataSelectorValid,[nameInput, jobInput], formEditProfile.querySelector('.popup__button'));
  openPopup(popupModalProfile);
}
/* открытие попапа для создания новой карточки */
function openAddCard(){
  toggleButtonState(dataSelectorValid, [nameCardInput, linkCardInput], formAddCard.querySelector('.popup__button'));
  cleanValueForm(formAddCard);
  openPopup(popupModalCard);
}

/* показываем сохранение... в процессе получения ответа с сервера */
function renderSave(isLoading, form, text=""){
  const btn = form.querySelector('.popup__button');
  if(isLoading){
    btn.textContent = "Сохранение...";
  } else
  btn.textContent = `${text}`;
}

/* отправить новую ссылку аватарки на сервер, показать сохранение...,
   получить ответ с данными с сервера, затем отрисовать аватарку */
function submitAvatarform (evt){
  evt.preventDefault();
  renderSave(true, formEditAvatar);
  pullAvatar(avatarInput.value)
  .then(res => {
    avatarUser.src = res.avatar;
  closePopup(popupModalAvatar);
  })
  .catch(err => console.log(err))
  .finally(() => renderSave(false, formEditAvatar, 'Сохранить'));
}

/* отправить данные профиля на сервер, показать сохранение...,
   получить ответ с данными с сервера, показать изменение профиля */
function submitProfileform (evt) {
  evt.preventDefault();
  renderSave(true, formEditProfile);
  pullDataUser(nameInput.value, jobInput.value)
  .then(data => {
    profileName.textContent = data.name;
    profileProfession.textContent = data.about;
    closePopup(popupModalProfile);
  })
  .catch(err => console.log(err))
  .finally(() => renderSave(false, formEditProfile, 'Сохранить'));
}

/* отправить данные новой карточки на сервер, показать сохранение...,
   получить ответ с данными с сервера, затем отрисовать карточку */
function submitAddcard (evt) {
  evt.preventDefault();
  renderSave(true, formAddCard);
  pullNewCard(nameCardInput.value, linkCardInput.value)
  .then(card => {
    renderCard([card]);
    closePopup(popupModalCard);
  })
  .catch(err => console.log(err))
  .finally(()=> renderSave(false, formAddCard, 'Создать'));
}

function addCard(oneCard){
  elementCard.prepend(oneCard);
}

/* отрисовка карточек/карточки полученн(ых)/(ой) с сервера */
function renderCard(cards){
  for(let i=0; i < cards.length; i++){
    const card = cards[i];
    const oneCardElement = createCard(card);
    addCard(oneCardElement);
  }
}

/* как только будут получены ответы от сервера с данными на запросы
  инфо о пользователе, и данных с карточками - начнём отрисовку данных на сайте */
Promise.all([getDataUser(), getInitialCards()])
.then(([dataUser, cards]) => {
    avatarUser.src =  dataUser.avatar;
    profileName.textContent = dataUser.name;
    profileProfession.textContent = dataUser.about;
    personId = dataUser._id; // получаем свой id пользователя и сохраняем в глоб. переменной
    renderCard(cards.reverse()); // масив объектов данными карточек сортируем в обратном порядке
  })
.catch(err => console.log(err));

btnAvatarEdit.addEventListener('click', openAvatarEdit);
btnProfileEdit.addEventListener('click', openProfileEdit);
btnAddCard.addEventListener('click', openAddCard);

popupModalsCloses.forEach(el => el.addEventListener('click', clickCross));
popupOverleys.forEach(el => el.addEventListener('click', clickOverley));

formEditAvatar.addEventListener('submit', submitAvatarform);
formEditProfile.addEventListener('submit', submitProfileform);
formAddCard.addEventListener('submit', submitAddcard);

enableValidation(dataSelectorValid);


export {personId, listenKeyboard};
