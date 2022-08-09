/* jshint esversion:6 */

/* класс Api - взаимодействие с сервером */
class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  /* метод: - проверка статуса обращения на сервер */
  checkResponse(res){
     if (res.ok) {
        return res.json();
      } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
  }

  /* метод: - отправить запрос на сервер - получить данные пользователя с сервера */
  getDataUser(){
    return fetch(`${this.baseUrl}/users/me`, {
    headers: this.headers
   })
  .then(res => this.checkResponse(res));
  }

  /* метод: отправить запрос и данные на сервер об изменении данных о пользователе */
  pullDataUser(nameUser, aboutUser){
    return fetch(`${this.baseUrl}/users/me`, {
    method:"PATCH",
    headers: this.headers,
    body: JSON.stringify({
    name: nameUser,
    about: aboutUser})
   })
  .then(res => this.checkResponse(res));
  }

  /* метод: отправить запрос на сервер на получение данных карточек */
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
    headers: this.headers
   })
  .then(res => this.checkResponse(res));
  }

  /* метод: отправить на сервер данные ссылки новой аватарки */
  pullAvatar(urlAvatar){
    return fetch(`${this.baseUrl}/users/me/avatar`, {
    method:"PATCH",
    headers: this.headers,
    body: JSON.stringify({
    avatar: urlAvatar
    })
  })
  .then(res => this.checkResponse(res));
  }

  /* метод: отправить данные новой карточки на сервер */
  pullNewCard(cardName, cardlink){
    return  fetch(`${this.baseUrl}/cards`, {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify({
    name: cardName,
    link: cardlink})
   })
  .then(res => this.checkResponse(res));
  }

  /* метод: отправить запрос на удаление карточки с сервера */
  deleteCard(cardId){
   return  fetch(`${this.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this.headers
   })
  .then(res => this.checkResponse(res));
  }

  /* метод: отправить инфо на сервер о том, что поставили лайк карточке */
  putPullLike(cardId){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,  {
    method:"PUT",
    headers: this.headers
    })
  .then(res => this.checkResponse(res));
  }

  /* метод: отправить инфо на сервер об удалении лайка с карточки */
  deletePullLike(cardId){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{
    method: "DELETE",
    headers: this.headers
  })
  .then(res => this.checkResponse(res));
  }
}


export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'c6c844d5-a2d0-4fc9-b884-37783e126543',
    'Content-Type': 'application/json'
  }
});

