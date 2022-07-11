/* jshint esversion:6 */

import {openPopup, closePopup} from './modal.js';
import {personId} from '../pages/index.js';
import trash from '../images/trash.svg';
import {template, imageModal, picture, pictureName,  popupModalAgreement,} from '../utils/constants.js';
import {deleteCard, putPullLike, deletePullLike} from '../components/api.js';

/* подготовка карточки к отрисовке с проверкой на принадлежность обладателю */
function createCard(data) {
  const card = getTemplate();
  const selectorImage = card.querySelector('.cards__image');
  const selectorTrash = card.querySelector('.cards__trash');
  const selectorLike = card.querySelector('.cards__like');
  const selectorCountLike = card.querySelector('.cards__like-count');
  const selectorTitle = card.querySelector('.cards__title');
  card.id = data._id;
  selectorImage.src = data.link;
  selectorImage.alt = `Изображение: ${data.name}`;
  if(data.owner._id === personId){
    selectorTrash.alt ='Изображение: Корзина';
    selectorTrash.title ='Удалить карточку';
    selectorTrash.src = trash;
    setEventCardTrash(card, selectorTrash, data._id); // вешаем прослушиватель на удаления карточки
  } else {
   selectorTrash.remove();  // если карточка не наша - удаляем элемент корзинки из html разметки карточки
  }
  for(let i=0; i < data.likes.length; i++){
    if(data.likes[i]._id === personId){
      selectorLike.classList.add('cards__like_active'); // если ранее ставили лайк на карточке - ставим лайк
    }
  }
  selectorLike.title = 'Поставить отметку: Нравится';
  selectorCountLike.textContent =`${data.likes.length}`;
  selectorTitle.textContent = data.name;
  setEventListeners(selectorLike, selectorImage, selectorCountLike, data.link, data.name, data._id);
  return card;
}

/* поставить или убрать лайк */
function toggleLike(selectorLike, selectorCountLike, cardId){
  if (selectorLike.classList.contains('cards__like_active')){
    deletePullLike(cardId)
    .then(data => {
      selectorLike.classList.remove('cards__like_active');
      selectorCountLike.textContent = `${data.likes.length}`;
    })
    .catch(err => console.log(err));
  } else {
    putPullLike(cardId)
    .then(data => {
      selectorLike.classList.add('cards__like_active');
      selectorCountLike.textContent = `${data.likes.length}`;
    })
    .catch(err => console.log(err));
  }
}

/* удаление карточки при нажатии на козинку */
function removeCard(card, cardId){
  deleteCard(cardId)
  .then(data => {
    card.remove();
    closePopup(popupModalAgreement);
  })
  .catch(err => console.log(err));
}

/* открытие попапа подтверждения на удаление карточки */
function getAgreement(card, cardId){
 openPopup(popupModalAgreement);
 popupModalAgreement.querySelector('.popup__button').addEventListener('click', () => {
  removeCard(card, cardId);});
}

/* установка просушивателя удаления карточки */
function setEventCardTrash(card, selectorTrash, cardId){
  selectorTrash.addEventListener('click', () => getAgreement(card, cardId));
}

/* устанока общих прослушивателей для всех карточек - при клике на сердечко - поставить или убрать лайк,
   при клике на изображение карточки - развернуть изображение карточки  */
function setEventListeners(selectorLike, selectorImage, selectorCountLike, cardLink, cardName, cardId) {
    selectorLike.addEventListener('click', () => toggleLike(selectorLike, selectorCountLike, cardId));
    selectorImage.addEventListener('click', () => {
      openPopup(imageModal);
      picture.src = cardLink;
      picture.alt = cardName;
      pictureName.textContent = cardName;
  });
}

/* получить копию разметки из темплейт для формирования карточки */
function getTemplate(){
  const newCard = template.querySelector('.cards__item').cloneNode(true);
  return newCard;
}

export {createCard};
