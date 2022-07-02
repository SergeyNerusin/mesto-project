/* jshint esversion:6 */

import {openPopup} from './modal.js';
import trash from '../images/trash.svg';
import {template, imageModal, picture, pictureName} from '../utils/constants.js';

function createCard(cardLink, cardName) {
  const card = getTemplate();
  const selectorImage = card.querySelector('.cards__image');
  const selectorTrash = card.querySelector('.cards__trash');
  const selectorLike = card.querySelector('.cards__like');
  const selectorTitle = card.querySelector('.cards__title');
  selectorImage.src = cardLink;
  selectorImage.alt = `Изображение: ${cardName}`;
  selectorTrash.alt ='Изображение: Корзина';
  selectorTrash.title ='Удалить карточку';
  selectorTrash.src = trash;
  selectorLike.title = 'Поставить отметку: Нравится';
  selectorTitle.textContent = cardName;
  setEventListeners(card,selectorTrash, selectorLike, selectorImage, cardLink, cardName);
  return card;
}

function setEventListeners(card, selectorTrash, selectorLike, selectorImage, cardLink, cardName) {
    selectorTrash.addEventListener('click', () => card.remove());
    selectorLike.addEventListener('click', () => selectorLike.classList.toggle('cards__like_active'));
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
