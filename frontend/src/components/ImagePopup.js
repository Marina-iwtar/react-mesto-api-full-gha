import React from "react";

function ImagePopup({ card, onClose, name }) {
  return (
    <div className={`popup popup_${name} ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <div className="popup__container-image">
          <button
            className="popup__close popup__close_image"
            type="button"
            aria-label="кнопка закрытия модального окна"
            onClick={onClose}
          ></button>
          <img src={card.link} alt={card.name} className="popup__image" />
          <h2 className="popup__title-image">{card.name}</h2>
        </div>
      </div>
    </div>
  );
}
export default ImagePopup;
