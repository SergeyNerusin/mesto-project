/* jshint esversion:6 */

import {openFotofromCard} from './modal';
import trash from '../images/trash.svg';

const elementCard = document.querySelector('.cards');
const template = document.querySelector('#oneCard').content;

function createCard(cardLink, cardName) {
  const oneCard = template.querySelector('.cards__item').cloneNode(true);
  const selectorImage = oneCard.querySelector('.cards__image');
  const selectorTrash = oneCard.querySelector('.cards__trash');
  const selectorLike = oneCard.querySelector('.cards__like');
  const selectorTitle = oneCard.querySelector('.cards__title');
  selectorImage.src = cardLink;
  selectorImage.alt = `Изображение: ${cardName}`;
  selectorTrash.alt ='Изображение: Корзина';
  selectorTrash.title ='Удалить карточку';
  selectorTrash.src = trash;
  selectorLike.title = 'Поставить отметку: Нравится';
  selectorTitle.textContent = cardName;
  return oneCard;
}

function addCard(oneCard){
  elementCard.prepend(oneCard);
}

function putLikeHandler(cardLike) {
  cardLike.classList.toggle('cards__like_active');
}

function deleteCardHandler(trashCard) {
    const card = trashCard.closest('.cards__item');
    card.remove();
}

function viewImagesfoto(clickObject){
    const card = clickObject.closest('.cards__item');
    const linkImage = card.querySelector('.cards__image').getAttribute('src');
    const altImage = card.querySelector('.cards__image').getAttribute('alt');
    const titleImage = card.querySelector('.cards__title').textContent;
    openFotofromCard(linkImage, titleImage, altImage);
}

export {createCard, addCard, putLikeHandler, deleteCardHandler, viewImagesfoto};
