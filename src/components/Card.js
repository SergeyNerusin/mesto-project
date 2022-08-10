/* jshint esversion:6 */

export default class Card{
  constructor(dataCard, personId, trash, cardSelectorTemplate, { handleClickLikeCard }, {handleImagezoomCardClick}, {openPopupConfirmCardDeleting}){
    this._name = dataCard.name; // имя будущей карточки
    this._link = dataCard.link; // ссылка на картику будущей карточки
    this._id = dataCard._id; // id будущей карточки
    this._trash = trash; // картинка корзинки - удаление карточки
    this._ownerId = dataCard.owner._id; // владелец карточки
    this._likes = dataCard.likes; // получаем обект в котором инф-я кто лайкнул карточку
    this._personId = personId; // мой id пользователя
    this._selectorTemplate = cardSelectorTemplate; // селектор разметки templete тега
    this._handleCardClick = handleImagezoomCardClick; // развернуть картинку карточки при клике по ней
    this._handleClickLikeCard = handleClickLikeCard; // поставить-убрать лайк карточке
    this._popupConfirmDelete =  openPopupConfirmCardDeleting; // мод. окно подтверждения согласия на удаление карточки
  }

  /* метод: получить копию разметки из темплейт для формирования карточки */
  _getTemplate(){
    const newCard = document.querySelector(this._selectorTemplate).querySelector('.cards__item').cloneNode(true);
    return newCard;
  }
  /*метод - формирование карточки с установкой всех необходимых прослушивателей */
  createCard(){
    this._card = this._getTemplate();
    this._selectorImage = this._card.querySelector('.cards__image');
    this._selectorTrash = this._card.querySelector('.cards__trash');
    this._selectorLike = this._card.querySelector('.cards__like');
    this._selectorCountLike = this._card.querySelector('.cards__like-count');
    this._selectorTitle = this._card.querySelector('.cards__title');
    this._card.id = this._id;
    this._selectorImage.src = this.link;
    this._selectorImage.alt = `Изображение: ${data.name}`;
    if(this._ownerId === this._personId){
      this._selectorTrash.alt ='Изображение: Корзина';
      this._selectorTrash.title ='Удалить карточку';
      this._selectorTrash.src = this.trash;
      this._setEventCardTrash(this.card, this._selectorTrash, this._card._id); // вешаем прослушиватель на удаления карточки
    } else {
    this.selectorTrash._remove();  // если карточка не наша - удаляем элемент корзинки из html разметки карточки
    }
    for(let i=0; i < data.likes.length; i++){
      if(data.likes[i]._id === personId){
        this._selectorLike.classList.add('cards__like_active'); // если ранее ставили лайк на карточке - ставим лайк
      }
    }
    this._selectorLike.title = 'Поставить отметку: Нравится';
    this._selectorCountLike.textContent =`${data.likes.length}`;
    this._selectorTitle.textContent = data.name;
    this._setEventListeners(this._selectorLike, this._selectorImage, this._selectorCountLike, data.link, data.name, data._id);
    return this._card;
  }

  /* метод: установка просушивателя удаления карточки */
  _setEventCardTrash(card, selectorTrash, cardId){
    selectorTrash.addEventListener('click', () => getAgreement(card, cardId));
  }

  /* метод: поставить или убрать лайк */
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


   /* метод: установка общих прослушивателей для всех карточек - при клике на сердечко - поставить или убрать лайк,
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
  // метод: удалить карточку
  _removeCard(){
    this._card.remove();

  }
}
