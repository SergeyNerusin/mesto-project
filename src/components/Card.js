/* jshint esversion:6 */

/*
    ***Создание класса Card***

    Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение:
      - принимает в конструктор её данные и селектор её template-элемента;
      - содержит приватные методы, которые работают с разметкой, устанавливают
        слушателей событий;
      - содержит приватные методы для каждого обработчика;
      - содержит один публичный метод, который возвращает полностью работоспособный и
        наполненный данными элемент карточки.
    Для каждой карточки создайте экземпляр класса Card.
    Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом - cделайте так,
    чтобы Card принимал в конструктор функцию handleCardClick. При клике на карточку эта
    функция должна открывать попап с картинкой.
*/

export default class Card{
  constructor(dataCard, personId, trash, cardSelectorTemplate, { handleClickLikeCard }, {handleImagezoomCardClick}, {openPopupConfirmCardDeleting}){
    this._name = dataCard.name; // имя будущей карточки
    this._link = dataCard.link; // ссылка на картику будущей карточки
    this._id = dataCard._id; // id будущей карточки
    this._trash = trash; // картинка корзинки - удаление карточки
    this._ownerId = dataCard.owner._id; // владелец карточки
    this._likes = dataCard.likes; // получаем объект в котором инфо о тех кто лайкнул карточку
    this._personId = personId; // мой id пользователя
    this._selectorTemplate = cardSelectorTemplate; // селектор разметки templete тега
    this._handleOpenImgCardClick = handleImagezoomCardClick; // развернуть картинку карточки при клике по ней
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
    this._cardId = this._id;
    this._selectorImage.src = this.link;
    this._selectorImage.alt = `Изображение: ${this._name}`;
    this._setCardTrash();
    this._isLike();
    this._selectorLike.title = 'Поставить отметку: Нравится';
    this._selectorCountLike.textContent =`${this._likes}`;
    this._selectorTitle.textContent = this._name;
    this._setEventListeners();
    return this._card;
  }

  /* метод: установка корзинки удаления карточки и просушивателя удаления карточки */
  _setCardTrash(){
     if(this._ownerId === this._personId){
      this._selectorTrash.alt ='Изображение: Корзина';
      this._selectorTrash.title ='Удалить карточку';
      this._selectorTrash.src = this.trash;
      this._selectorTrash.addEventListener('click', () => this._popupConfirmDelete(this._card, this._cardId)); // вешаем прослушиватель на удаления карточки
    } else {
    this._selectorTrash.remove();  // если карточка не наша - удаляем элемент корзинки из html разметки карточки
    }
  }

  /* метод: проверка наличия отметки "нравится" - поставленной ранее пользователем */
  _isLike(){
      for(let i=0; i < this._likes.length; i++){
      if(this._likes[i]._id === this._personId){
        this._selectorLike.classList.add('cards__like_active'); // если ранее ставили лайк на карточке - ставим лайк
      }
    }
  }

  /* метод: поставить лайк */
  putCardLike(){
     this_.selectorLike.classList.add('cards__like_active');
     this._selectorCountLike.textContent = `${this._likes.length}`;
  }

  /* метод: убрать лайк */
  dellCardLike(){
     this._selectorLike.classList.remove('cards__like_active');
     this._selectorCountLike.textContent = `${this._likes.length}`;
  }

   /* метод: установка общих прослушивателей для всех карточек - при клике на сердечко - поставить или убрать лайк,
   при клике на изображение карточки - развернуть изображение карточки  */
  _setEventListeners() {
    this._selectorLike.addEventListener('click', () => this._handleClickLikeCard(this._selectorLike, this._selectorCountLike, this._cardId));
    this._selectorImage.addEventListener('click', () => this._handleOpenImgCardClick(this._link, this._name));
  }

  // метод: удалить карточку
  removeCard(){
    this._card.remove();
  }
}
