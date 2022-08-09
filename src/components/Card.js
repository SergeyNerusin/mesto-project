/* jshint esversion:6 */

export default class Card{
  constructor({name, link}, selector, handleCardClick){
    this.name = name;
    this.link = link;
    this.selectorTemplate = selector;
  }

  /* Метод: получить копию разметки из темплейт для формирования карточки */
  _getTemplate(){
    this.newCard = this.selectorTemplate.querySelector('.cards__item').cloneNode(true);
    return this.newCard;
  }

  /* Метод: установка просушивателя удаления карточки */
  _setEventCardTrash(card, selectorTrash, cardId){
    selectorTrash.addEventListener('click', () => getAgreement(card, cardId));
  }


  /* поставить или убрать лайк */
  _toggleLike(selectorLike, selectorCountLike, cardId){
    if (selectorLike.classList.contains('cards__like_active')){
      api.deletePullLike(cardId)
      .then(data => {
        selectorLike.classList.remove('cards__like_active');
        selectorCountLike.textContent = `${data.likes.length}`;
      })
      .catch(err => console.log(err));
    } else {
      api.putPullLike(cardId)
      .then(data => {
        selectorLike.classList.add('cards__like_active');
        selectorCountLike.textContent = `${data.likes.length}`;
      })
      .catch(err => console.log(err));
    }
  }
  

   /* Метод: установка общих прослушивателей для всех карточек - при клике на сердечко - поставить или убрать лайк,
   при клике на изображение карточки - развернуть изображение карточки  */
  _setEventListeners(selectorLike, selectorImage, selectorCountLike, cardLink, cardName, cardId) {
    selectorLike.addEventListener('click', () => toggleLike(selectorLike, selectorCountLike, cardId));
    selectorImage.addEventListener('click', () => {
      openPopup(imageModal);
      picture.src = cardLink;
      picture.alt = cardName;
      pictureName.textContent = cardName;
    });
  }

  createCard(){
    const card = _getTemplate();
    const selectorImage = card.querySelector('.cards__image');
    const selectorTrash = card.querySelector('.cards__trash');
    const selectorLike = card.querySelector('.cards__like');
    const selectorCountLike = card.querySelector('.cards__like-count');
    const selectorTitle = card.querySelector('.cards__title');
    card.id = data._id;
    // selectorImage.onerror = (err) => {card.remove(); console.log("ошибка загрузки", err);};
    selectorImage.src = data.link;
    selectorImage.alt = `Изображение: ${data.name}`;
    if(data.owner._id === personId){
      selectorTrash.alt ='Изображение: Корзина';
      selectorTrash.title ='Удалить карточку';
      selectorTrash.src = trash;
      this._setEventCardTrash(card, selectorTrash, data._id); // вешаем прослушиватель на удаления карточки
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
    this._setEventListeners(selectorLike, selectorImage, selectorCountLike, data.link, data.name, data._id);
    return card;
  }

}
