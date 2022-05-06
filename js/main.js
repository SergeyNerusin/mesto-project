/* jshint esversion: 6 */

/* Объект с данными карточек для вывода при открытии сайта по умолчанию */
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



/* селекторы исполюзуемые в фукциях */

// селектор поля - имя профиля
const nameInput = document.querySelector('.form-profile__item_el_name');
// селектор - поля профессия
const jobInput = document.querySelector('.form-profile__item_el_profession');
// селекторы профайла
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

// селектор поля ввода: информация о фото
const nameCardInput = document.querySelector('.form-card__item_el_name');
// селектор поля ввода: ссылка на фото материал
const linkCardInput = document.querySelector('.form-card__item_el_link');

// определяем селектор модалного окна показа фото
const imageModal = document.querySelector('.popup__card-image');


/* ФУНКЦИИ */

/* 1. Функция ввода данных из формы профайла */
function submitProfileform (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  togglePopup(popupModalProfile);
}

/* 2.Функция ввода данных из формы для добавления карточки */
function submitAddcard (evt) {
  evt.preventDefault();
  // передаем в функцию ссылку на изображение, название карточки
  const oneCardElement = createCard(linkCardInput.value, nameCardInput.value);
  addCard(oneCardElement);
  // очищаем поля ввода после отрисовки
  nameCardInput.value = '';
  linkCardInput.value = '';
  // закрываем окно после нажатия кнопки сохранить
  togglePopup(popupModalCard);
}

/* 3. Функция открытия - закрытия модальных окон */
function togglePopup(popupWindow){
  popupWindow.classList.toggle('popup_opened');
}

/* 4.1. Функция формирования карточки с изображением, названием, лайком */
function createCard(cardLink, cardName) {
  // создаём копию  карточки HTML разметки
  const oneCard = template.querySelector('.cards__item').cloneNode(true);
  // записываем в переменную селектор для:
  // фото карточки
  const selectorImage = oneCard.querySelector('.cards__image');
  // корзинки удаления карточки
  const selectorTrash = oneCard.querySelector('.cards__trash');
  // всплытия подсказки
  const selectorLike = oneCard.querySelector('.cards__like');
  // названия карточки
  const selectorTitle = oneCard.querySelector('.cards__title');
  // записываем  в атрибуты необходимые данные
  selectorImage.src = cardLink;
  selectorImage.alt = `Изображение: ${cardName}`;
  selectorTrash.alt ='Изображение: Корзина';
  selectorTrash.title ='Удалить карточку';
  selectorTrash.src = './images/trash.svg';
  selectorLike.title = 'Поставить отметку: Нравится';
  selectorTitle.textContent = cardName;
  // для установки прослушивателя на создаваемой карточке:
  // нажатие на сердечке - поставить like
  putLikeHandler(selectorLike);
  // для установки прослушивателя на создаваемой карточке:
  // нажатие на корзинке - удалить карточку
  deleteCardHandler(selectorTrash);
  // для установки прослушивателя на отркытие изображения из карточки
  viewImagesfoto(selectorImage);
  return oneCard;
}

/* 4.2. Функция добавления карточки в HTML разметку */
function addCard(oneCard){
  // добавляем карточку в HTML разметку
  elementCard.prepend(oneCard);
}

/* 5. Функция: поставить отметку "Нравится" в карточке */
function putLikeHandler(cardLike) {
 // устанавливаем прослушиватель на сердечко в карточке
  cardLike.addEventListener('click', function (evt) {
     evt.target.classList.toggle('cards__like_active');});
}

/* 6. Функция удаления карточки при нажатии на картинку */
function deleteCardHandler(trashCard) {
  // устанавливаем прослушиватель на изображение корзины
  trashCard.addEventListener('click', function(evt) {
    const card = evt.target.closest('.cards__item');
    card.remove();});
}


/* 7. Функция открытия картинки из  отрисованной карточки */
function openFotofromCard(linkImage, titleImage, altImage){
  // затемняем фон для просмотра фото
  imageModal.style = 'background-color: #000';
  // устанавливаем необходимые атрибуты для отрисовки
  imageModal.querySelector('.popup__image').src = linkImage;
  // атрибут alt в лучае если картинка не загрузится
  imageModal.querySelector('.popup__image').alt = altImage;
  // наименование фото
  imageModal.querySelector('.popup__image-caption').textContent = titleImage;
  togglePopup(imageModal);
}

/* 8. Функция установки прослушивателя нажатия на кртинку карточки */
function viewImagesfoto(imageCard){
  imageCard.addEventListener('click', function(evt) {
    const card = evt.target.closest('.cards__item');
    const linkImage = card.querySelector('.cards__image').getAttribute('src');
    const altImage = card.querySelector('.cards__image').getAttribute('alt');
    const titleImage = card.querySelector('.cards__title').textContent;
    // вызов функции открытия окна просмотра фото карточки
    openFotofromCard(linkImage, titleImage, altImage);
  });
}

/* Установка прослушивателей и отрисовка карточек из заданного обеъкта по умолчанию */

// ставим прослушиватель на форму профайла
formEditProfile.addEventListener('submit', submitProfileform);
// ставим прослушиватель на форму добавления карточки
formEditCard.addEventListener('submit', submitAddcard);


// ставим прослушиватель на кнопку открытия модального окна редактирования профайла
buttonProfileEdit.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  togglePopup(popupModalProfile);
});

// ставим прослушиватель на кнопку открытия модального окна добавления фото
buttonAddFoto.addEventListener('click', function() {
  togglePopup(popupModalCard);
});

// Закрытие модальных окон
popupCloseModal.forEach(function(closeModal) {
  const buttonClose = closeModal.closest('.popup');
  closeModal.addEventListener('click', () => {
    nameCardInput.value="";
    linkCardInput.value="";
    togglePopup(buttonClose);});
});

// выводим  карточки из объекта initialCards
initialCards.forEach(function(element){
  const oneCardElement = createCard(element.link, element.name);
  addCard(oneCardElement);
});



