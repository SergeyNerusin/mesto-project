/* jshint esversion: 8 */

import {config} from "../utils/constants";

/* проверка статуса обращения на сервер */
const checkResponse = (res) => {
  if (res.ok) {
        return res.json();
      } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
};

/* отправить запрос на сервер - получить данные пользователя с сервера */
const getDataUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
   })
  .then(res => checkResponse(res));
};

/* отправить запрос и данные на сервер об изменении данных о пользователе */
const pullDataUser = (nameUser, aboutUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method:"PATCH",
    headers: config.headers,
    body: JSON.stringify({
    name: nameUser,
    about: aboutUser})
   })
  .then(res => checkResponse(res));
};

/* отправить запрос с сервер на получение данных карточек */
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
   })
  .then(res => checkResponse(res));
};

/* отправить на сервер данные ссылки новой аватарки */
const pullAvatar = (urlAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method:"PATCH",
    headers: config.headers,
    body: JSON.stringify({
    avatar: urlAvatar
    })
  })
  .then(res => checkResponse(res));
};

/* отправить данные новой карточки на сервер */
const pullNewCard = (cardName, cardlink) => {
  return  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
    name: cardName,
    link: cardlink})
   })
  .then(res => checkResponse(res));
};

/* отправить запрос на удаление карточки с сервера */
const deleteCard = (cardId) => {
  return  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
   })
  .then(res => checkResponse(res));
};

/*  отправить инфо на сервер о том, что поставили лайк карточке */
const putPullLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,  {
    method:"PUT",
    headers: config.headers
    })
  .then(res => checkResponse(res));
};

/* отправить инфо на сервер об удалении лайка с карточки */
const deletePullLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: "DELETE",
    headers: config.headers
  })
  .then(res => checkResponse(res));
};

export {getDataUser, pullDataUser, getInitialCards, pullAvatar, pullNewCard, deleteCard, putPullLike, deletePullLike};
