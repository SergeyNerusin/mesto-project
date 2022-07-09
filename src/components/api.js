/* jshint esversion: 8 */

import {config} from "../utils/constants";

const checkResponse = (res) =>{
  if (res.ok) {
        return res.json();
      } else {
          return Promise.reject(console.log(`Ошибка: ${res.status}`));
        }
};

/* получить данные о пользователе с сервера */
const getDataUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
   })
  .then(res => checkResponse(res));
};

/* отправить данные о пользователе на сервер */
const pullDataUser = (nameUser, aboutUser) => {
  fetch(`${config.baseUrl}/users/me`, {
    method:"PATCH",
    headers: config.headers,
    body: JSON.stringify({
    name: nameUser,
    about: aboutUser})
   })
  .then(res => checkResponse(res));
};

/* получить данные карточек с сервера */
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
   })
  .then(res => checkResponse(res));
};

/* отправить аватар на сервер */
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

/* удалить карточку с сервера */
const deleteCard = (cardId) => {
  return  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
   })
  .then(res => checkResponse(res));
};

/* поставить лайк и отправить инфо на сервер */
const putPullLike = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`,  {
    method:"PUT",
    headers: config.headers
    })
  .then(res => checkResponse(res));
};

/* удалить лак и отправить инфо на сервер */
const deletePullLike = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: "DELETE",
    headers: config.headers
  })
  .then(res => checkResponse(res));
};

export {getDataUser, pullDataUser, getInitialCards, pullAvatar, pullNewCard, deleteCard, putPullLike, deletePullLike};
