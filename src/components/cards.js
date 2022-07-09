/* jshint esversion:6 */

import {openPopup} from './modal.js';
import trash from '../images/trash.svg';
import {template, imageModal, picture, pictureName} from '../utils/constants.js';
import {getDataUser, pullDataUser, getInitialCards, pullNewCard, deleteCard, putPullLike, deletePullLike} from '../components/api.js';

function createCard(cardLink, cardName, cardId, cardCountLike) {
  const card = getTemplate();
  const selectorImage = card.querySelector('.cards__image');
  const selectorTrash = card.querySelector('.cards__trash');
  const selectorLike = card.querySelector('.cards__like');
  const selectorCountLike = card.querySelector('.cards__like-count');
  const selectorTitle = card.querySelector('.cards__title');
  card.id = cardId;
  selectorImage.src = cardLink;
  selectorImage.alt = `Изображение: ${cardName}`;
  selectorTrash.alt ='Изображение: Корзина';
  selectorTrash.title ='Удалить карточку';
  selectorTrash.src = trash;
  selectorLike.title = 'Поставить отметку: Нравится';
  selectorCountLike.textContent =`${cardCountLike}`;
  selectorTitle.textContent = cardName;
  setEventListeners(card, selectorTrash, selectorLike, selectorImage, cardLink, cardName, cardId);
  return card;
}

function toggleLike(selectorLike, cardId){
  selectorLike.classList.toggle('cards__like_active');
  if (selectorLike.classList.contains('cards__like_active')){
      putPullLike(cardId);
  } else {
      deletePullLike(cardId);
  }
}
/* удаление карточки при нажатии на козинку */
function removeCard(card, cardId){
  deleteCard(cardId)
  .then(data =>console.log('delete card:', data));
  card.remove();
}


function setEventListeners(card, selectorTrash, selectorLike, selectorImage, cardLink, cardName, cardId) {
    selectorTrash.addEventListener('click', () => removeCard(card, cardId));
    selectorLike.addEventListener('click', () => toggleLike(selectorLike, cardId));
    selectorImage.addEventListener('click', () => {
      openPopup(imageModal);
      picture.src = cardLink;
      picture.alt = cardName;
      pictureName.textContent = cardName;
  });
}


function getTemplate(){
  const newCard = template.querySelector('.cards__item').cloneNode(true);
  return newCard;
}



export {createCard};
