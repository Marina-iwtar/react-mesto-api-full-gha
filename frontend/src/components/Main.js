import React, { useContext } from "react";
import Header from './Header';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  userEmail,
  onClick
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      <Header path="/sign-in" nameButton = "Выйти" onClick = {onClick} userEmail={userEmail}/>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <button
              className="profile__pencil"
              type="button"
              aria-label="кнопка смены аватара"
              onClick={() => {
                onEditAvatar(true);
              }}
            >
              <img
                src={currentUser.avatar}
                alt="аватар"
                className="profile__avatar"
              />
            </button>
            <div className="profile-info">
              <div className="profile-info__container">
                <h1 className="profile-info__title">{currentUser.name}</h1>
                <button
                  className="profile-info__edit-button"
                  type="button"
                  aria-label="кнопка редактирования"
                  onClick={() => {
                    onEditProfile(true);
                  }}
                ></button>
              </div>
              <p className="profile-info__paragraph">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="кнопка добавления карточки"
            onClick={() => {
              onAddPlace(true);
            }}
          ></button>
        </section>

        <div className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Main;
