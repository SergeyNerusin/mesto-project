/* jshint esversion: 6 */

/*  Редактирование профиля  */

// кнопка редактирования профиля
const buttonProfileEdit = document.querySelector('.profile__edit');
// класс - окно редактирования профиля
const popupModalProfile = document.querySelector('.popup__profile');
// класс формы редактирования профиля
const formEditProfile = document.querySelector('.form-profile');

/* Определяем селекторы для работы с кнопками, с модалными окнами */

// селектор кнопки:  открытие формы добавления фотоматериала
const buttonAddFoto = document.querySelector('.profile__button');
// селектор  модального окна: добавление фото-материала
const popupModalCard = document.querySelector('.popup__card');
// селектор формы: добавление фото-материала
const formEditCard = document.querySelector('.form-card');

// селектор закрытия модальных окон (крестик)
const popupCloseModal = document.querySelectorAll('.popup__close');

/* Для вставки в HTML из тега template разметки, для добавления карточек:  */

// определяем селектор куда будем вставлять разметку
const elementCard = document.querySelector('.cards');
// определяем селектор откуда берём HTML разметку
const template = document.querySelector('#oneCard').content;

/* ФУНКЦИИ */

/* 1. Функция ввода данных из формы профайла */
function formSubmitHandler (evt) {
  evt.preventDefault();
  // селектор поля - имя профиля
  const nameInput = document.querySelector('.form-profile__item_el_name');
  // селектор - поля профессия
  const jobInput = document.querySelector('.form-profile__item_el_profession');
  const profileName = document.querySelector('.profile__name');
  const profileProfession = document.querySelector('.profile__profession');
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popupOpenClose(popupModalProfile);
}

/* 2.Функция ввода данных из формы для добавления карточки */
function formAddcardHandler (evt) {
  evt.preventDefault();
  const nameCardInput = document.querySelector('.form-card__item_el_name');
  // класс - поля профессия
  const linkCardInput = document.querySelector('.form-card__item_el_link');
  // передаем в функцию ссылку на изображение, название карточки
  addCards(linkCardInput.value, nameCardInput.value);
  // очищаем поля ввода после отрисовки
  nameCardInput.value = '';
  linkCardInput.value = '';
  // закрываем окно после нажатия кнопки сохранить
  popupOpenClose(popupModalCard);
}

/* 3. Функция открытия - закрытия модальных окон */
function popupOpenClose(popupWindow){
  popupWindow.classList.toggle('popup_opened');
}

/* 4. Функция формирования карточки с изображением, названием, лайком */
function addCards(cardLink, cardName) {
  // создаём копию  карточки HTML разметки
  const oneCard = template.querySelector('.cards__item').cloneNode(true);
  // записываем  в атрибуты необходимые данные
  oneCard.querySelector('.cards__image').src = cardLink;
  oneCard.querySelector('.cards__image').alt = `Изображение: ${cardName}`;
  oneCard.querySelector('.cards__trash').alt ='Изображение: Корзина';
  oneCard.querySelector('.cards__trash').title ='Удалить карточку';
  oneCard.querySelector('.cards__like').title = 'Поставить отметку: Нравится';
  oneCard.querySelector('.cards__trash').src = './images/trash.svg';
  oneCard.querySelector('.cards__title').textContent = cardName;
  // добавляем карточку в HTML  разметку
  elementCard.prepend(oneCard);
  // для установки прослушивателя на создаваемой карточке:
  // нажатие на сердечке - поставить like
  const cardLike = document.querySelector('.cards__like');
  putLikeHandler(cardLike);
  // для установки прослушивателя на создаваемой карточке:
  // нажатие на корзинке - удалить карточку
  const trashCard = document.querySelector('.cards__trash');
  deleteCardHandler(trashCard);
  // для установки прослушивателя на отрытие изображения из карточки
  const imageCard = document.querySelector('.cards__image');
  ViewImagesHandler(imageCard);
}

/* 5. Функция: поставить отметку "Нравится" в карточке */
function putLikeHandler(cardLike) {
 // устанавливаем прослушиватель на сердечко в карточке
cardLike.addEventListener('click', function (evt) {
  evt.target.classList.add('cards__like_active');});
}

/* 6. Функция удаления карточки при нажатии на картинку */
function deleteCardHandler(trashCard) {
  // устанавливаем прослушиватель на изображение корзины
  trashCard.addEventListener('click', function(evt) {
      const card = evt.target.closest('.cards__item');
      card.remove();});
}


/* 7. Функция открытия картинки из  отрисованной карточки */
function popupOpenImage(linkImage, titleImage, altImage){
  // определяем селектор модалного окна показа фото
  const imageModal = document.querySelector('.popup__card-image');
  // затемняем фон для просмотра фото
  imageModal.style = 'background-color: #000';
  // устанавливаем необходимые атрибуты для отрисовки
  imageModal.querySelector('.popup__image').src = linkImage;
  // атрибут alt в лучае если картинка не загрузится
  imageModal.querySelector('.popup__image').alt = altImage;
  // наименование фото
  imageModal.querySelector('.popup__image-caption').textContent = titleImage;
  popupOpenClose(imageModal);
}

/* 8. Функция установки прослушивателя нажатия на кртинку карточки */
function ViewImagesHandler(imageCard){
  imageCard.addEventListener('click', function(evt) {
    const card = evt.target.closest('.cards__item');
    const linkImage = card.querySelector('.cards__image').getAttribute('src');
    const altImage = card.querySelector('.cards__image').getAttribute('alt');
    const titleImage = card.querySelector('.cards__title').textContent;
    // вызов функции открытия окна просмотра фото карточки
    popupOpenImage(linkImage, titleImage, altImage);
  });
}

/* Установка прослушивателей и отрисовка карточек из заданного обеъкта по умолчанию */

// ставим прослушиватель на форму профайла
formEditProfile.addEventListener('submit', formSubmitHandler);
// ставим прослушиватель на форму добавления карточки
formEditCard.addEventListener('submit', formAddcardHandler);


// ставим прослушиватель на кнопку открытия модального окна редактирования профайла
buttonProfileEdit.addEventListener('click', function() {
  popupOpenClose(popupModalProfile);
});

// ставим прослушиватель на кнопку открытия модального окна добавления фото
buttonAddFoto.addEventListener('click', function() {
  popupOpenClose(popupModalCard);
});

// Закрытие модальных окон
popupCloseModal.forEach(function(closeModal) {
  const buttonClose = closeModal.closest('.popup');
  closeModal.addEventListener('click', () => popupOpenClose(buttonClose));
});


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// выводим  карточки из объекта initialCards
initialCards.forEach(function(element){
  addCards(element.link, element.name);
});



