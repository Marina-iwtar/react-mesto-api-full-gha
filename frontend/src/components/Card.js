import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__vector ${
    isLiked ? "element__vector_active" : " "
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div>
      <article className="element">
        <img
          src={card.link}
          alt={card.name}
          className="element__mask-group"
          onClick={handleClick}
        />
        {isOwn && (
          <button className="element__delete" onClick={handleDeleteClick} />
        )}
        <div className="element__group">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button
              className={cardLikeButtonClassName}
              type="button"
              aria-label="кнопка лайк"
              onClick={handleLikeClick}
            ></button>
            <span className="element__counter">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </div>
  );
}
export default Card;
