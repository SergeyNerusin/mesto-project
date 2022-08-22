/* jshint esversion:6 */

/*
  ***Создайте класс UserInfo***
  Класс UserInfo отвечает за управление информацией о пользователе на странице.
  Этот класс:
  - принимает в конструктор объект с селекторами двух элементов:
      - элемента имени пользователя,
      - элемента информации о себе.

  - содержит публичный метод getUserInfo, который возвращает объект с данными пользователя,
    данные для этого метода нужно получать от методов класса Api — подумайте над тем,
    как внедрить метод класса Api в getUserInfo, когда данные пользователя нужно будет
    подставить в форму при открытии — метод вам пригодится.

  - содержит публичный метод setUserInfo, который принимает новые данные пользователя,
    отправляет их на сервер и добавляет их на страницу.

   В описании проекта дана супер запутанная формулировка
   “подумайте над тем, как внедрить метод класса Api в getUserInfo”.
   Но вы же уже опытные и понимаете, что внедрять методы одного класса в другой так себе идея.
   Принцип разделения ответственности и всё такое.
   Встаёт вопрос, как же нам это выполнить? На самом деле довольно просто, нужно всего-лишь помнить
   о разделении этой самой ответственности.
   Класс UserInfo у нас отвечает за сохранение данных пользователя на странице
   внутри соответствующих html элементов и за получение этих данных из этих же элементов.
   Класс Api за получение и обновление данных с сервера.

   Поэтому нам нужно сделать следующее:
   При загрузке страницы получить данные с сервера (метод класса Api)
   Сохранить данные на странице при помощи метода setUserInfo класса UserInfo
   Если эти данные будут нужны еще где-то на странице, то получить их воспользовавшись методом getUserInfo класса UserInfo
   Если данные нужно будет сохранить на сервере, то обращаемся к методу setUserInfo класса Api и не забываем обновить данные на странице, вызвав setUserInfo класса UserInfo.

*/

export default class UserInfo {
  constructor({profileName, profileProfession, profileAvatar}){
    this.profileName = document.querySelector(profileName);
    this.profileProfession = document.querySelector(profileProfession);
    this.profileAvatar = document.querySelector(profileAvatar);
  }

  setUserinfo(name, profession ){
    this.profileName.textContent = name;
    this.profileProfession.textContent = profession;
  }

  getUserInfo(){
    return {
      name: this.profileName.textContent,
      profession: this.profileProfession.textContent
    };
  }

  setUserAvatar(linkAvatar){
    this.profileAvatar.src = linkAvatar;
  }
}
