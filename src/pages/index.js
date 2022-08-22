/* jshint esversion: 8 */

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '..components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import * as constants from '../utils/constants.js';

import './index.css';

/* id пользователя - получаем с сервера  */
let personId = "";
const trash ='../images/trash.svg';

export const api = new Api(constants.configApi);
const dataProfileUser = new UserInfo(constants.plofileSelectors);
const popupShowCardImage = new PopupWithImage(constants.popupSelectors.popupShowImage);
popupShowCardImage.setEventListeners();
const popupConfirmDel = new PopupWithEgrement(constants.popupSelectors.popupEgreement);

const containerCards = new Section({
  items,
  renderer: () => {
    const card = new Card(
      dataCard,
      personId,
      trash,
      constants.template,
      {handleClickLikeCard: ()=>{
         if (this._selectorLike.classList.contains('cards__like_active')){
            api.deletePullLike()
            .then(() => {
            this.dellCardLike();})
            .catch(err => console.log(err));
          } else {
            api.putPullLike()
            .then(() => {
            this.putCardLike(); })
            .catch(err => console.log(err));
          }
        }
      },
      {handleImagezoomCardClick: (title, link)=> {
        popupShowCardImage.open(title, link);
      }},
      {openPopupConfirmCardDeleting: ()=> {
        popupConfirmDel.open(id)  // недоведено до ума...
      }});
  }
}, constants.containerCard);

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
Promise.all([api.getDataUser(), api.getInitialCards()])
.then(([dataUser, cards]) => {
    dataProfileUser.setUserAvatar(dataUser.avatar);
    dataProfileUser.setUserinfo(dataUser.name, dataUser.about);
    personId = dataUser._id; // получаем свой id пользователя и сохраняем в глоб. переменной
    renderCard(cards.reverse()); // масив объектов с данными карточек сортируем в обратном порядке
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
