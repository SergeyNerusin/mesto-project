/* jshint esversion:6 */

import {openPopup, closePopup} from './modal.js';
import {personId} from '../pages/index.js';
import trash from '../images/trash.svg';
import {template, imageModal, picture, pictureName,  popupModalAgreement,} from '../utils/constants.js';
import {deleteCard, putPullLike, deletePullLike} from '../components/api.js';

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
    setEventCardTrash(card, selectorTrash, data._id);
    console.log('createCard data:', data);
  } else {
    selectorTrash.remove();
  }
  for(let i=0; i < data.likes.length; i++){
    if(data.likes[i]._id === personId){
      selectorLike.classList.add('cards__like_active');
    }
  }
  selectorLike.title = 'Поставить отметку: Нравится';
  selectorCountLike.textContent =`${data.likes.length}`;
  selectorTitle.textContent = data.name;
  setEventListeners(selectorLike, selectorImage, selectorCountLike, data.link, data.name, data._id);
  return card;
}

function toggleLike(selectorLike, selectorCountLike, cardId){
  selectorLike.classList.toggle('cards__like_active');
  if (selectorLike.classList.contains('cards__like_active')){
      putPullLike(cardId)
      .then(data => { selectorCountLike.textContent = `${data.likes.length}`;});
  } else {
      deletePullLike(cardId)
      .then(data => { selectorCountLike.textContent = `${data.likes.length}`;});
  }
}

/* удаление карточки при нажатии на козинку */
function removeCard(card, cardId){
  deleteCard(cardId)
  .then(data =>console.log('delete card:', data));
  card.remove();
  closePopup(popupModalAgreement);
}

/* получить одобрение на удаление карточки */
function getAgreement(card, cardId){
 openPopup(popupModalAgreement);
 popupModalAgreement.querySelector('.popup__button').addEventListener('click', () => {
  removeCard(card, cardId);});
}

function setEventCardTrash(card, selectorTrash, cardId){
  selectorTrash.addEventListener('click', () => getAgreement(card, cardId));
}

function setEventListeners(selectorLike, selectorImage, selectorCountLike, cardLink, cardName, cardId) {
    selectorLike.addEventListener('click', () => toggleLike(selectorLike, selectorCountLike, cardId));
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
