/* jshint esversion: 6 */

import Api from '../components/api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithEgrement from '../components/PopupWithEgrement.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import * as constants from '../utils/constants.js';

import './index.css';
import trash from '../images/trash.svg';

/* id пользователя - получаем с сервера  */
let personId = '';

const {
  popupAvatar,
  popupProfile,
  popupAddCard,
  popupShowImage,
  popupEgreement,
} = constants.popupSelectors;

const api = new Api(constants.configApi);
const dataProfileUser = new UserInfo(constants.profileSelectors);
const popupShowCardImage = new PopupWithImage(popupShowImage);

const containerCards = new Section(
  {
    renderer: (itemCard) => {
      const card = new Card(
        itemCard,
        personId,
        trash,
        constants.template,
        {
          handleClickLikeCard: (selectorLike, cardId) => {
            if (selectorLike.classList.contains('cards__like_active')) {
              api
                .deleteLike(cardId)
                .then((res) => {
                  card.dellCardLike(res.likes.length);
                })
                .catch((err) => console.log(err));
            } else {
              api
                .putLike(cardId)
                .then((res) => {
                  card.putCardLike(res.likes.length);
                })
                .catch((err) => console.log(err));
            }
          },
        },
        {
          handleOpenImgCardClick: (title, link) => {
            popupShowCardImage.open(title, link);
          },
        },
        {
          popupConfirmCardDelete: (cardId) => {
            const popupConfirmDel = new PopupWithEgrement(popupEgreement, {
              submit: () => {
                api
                  .deleteCard(cardId)
                  .then(() => {
                    card.removeCard();
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    popupConfirmDel.closePopup();
                  });
              },
            });
            popupConfirmDel.openPopup();
            popupConfirmDel.setEventListeners();
          },
        }
      );

      const oneCardElement = card.createCard();
      containerCards.addItem(oneCardElement);
    },
  },
  constants.containerCard
);

/* отрисовка карточек/карточки полученн(ых)/(ой) с сервера */
function renderCard(cards) {
  containerCards.renderItems(cards);
}

/* Как только будут получены ответы  на запросы от сервера с данными:
    - инфо о пользователе,
    - данными карточек
  начнём отрисовку данных на сайте */
Promise.all([api.getDataUser(), api.getInitialCards()])
  .then(([dataUser, cards]) => {
    dataProfileUser.setUserAvatar(dataUser.avatar);
    dataProfileUser.setUserInfo(dataUser.name, dataUser.about);
    personId = dataUser._id; // получаем свой id пользователя и сохраняем в глоб. переменной
    renderCard(cards.reverse()); // масив объектов с данными карточек сортируем в обратном порядке
  })
  .catch((err) => console.log(err));

// Для валидации форм в которые будем вводить данные
const popupElements = [popupAvatar, popupProfile, popupAddCard];
const [popupAvatarValidate, popupProfileValidate, popupAddCardValidate] =
  popupElements.map((popupElement) => {
    const popupForm = document.querySelector(popupElement);
    const validator = new FormValidator(
      constants.dataSelectorsValid,
      popupForm
    );
    return validator;
  });

const formEditProfile = new PopupWithForm(popupProfile, popupProfileValidate, {
  callbackSubmit: ({ name, about }, renderSaveBtn) => {
    api
      .pullDataUser(name, about)
      .then((res) => {
        constants.profileName.textContent = name;
        constants.profileProfession.textContent = about;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderSaveBtn(false);
        formEditProfile.closePopup();
      });
  },
});

const formAddCard = new PopupWithForm(popupAddCard, popupAddCardValidate, {
  callbackSubmit: ({ cardName, link }, renderSaveBtn) => {
    api
      .pullNewCard(cardName, link)
      .then((res) => {
        renderCard([res]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderSaveBtn(false);
        formAddCard.closePopup();
      });
  },
});

const formEditAvatar = new PopupWithForm(popupAvatar, popupAvatarValidate, {
  callbackSubmit: ({ avatar }, renderSaveBtn) => {
    api
      .pullAvatar(avatar)
      .then((res) => {
        dataProfileUser.setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderSaveBtn(false);
        formEditAvatar.closePopup();
      });
  },
});

// Создаем экземпляры FormValidator для каждой формы

formEditProfile.setEventListeners();
constants.btnProfileEdit.addEventListener('click', () => {
  popupProfileValidate.enableValidation();
  const { nameUser, profession } = dataProfileUser.getUserInfo();
  constants.nameInput.value = nameUser;
  constants.jobInput.value = profession;
  formEditProfile.openPopup();
});

constants.btnAddCard.addEventListener('click', () => {
  popupAddCardValidate.enableValidation();
  formAddCard.openPopup();
});

constants.btnAvatarEdit.addEventListener('click', () => {
  popupAvatarValidate.enableValidation();
  formEditAvatar.openPopup();
});
