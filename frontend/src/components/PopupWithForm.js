import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  textButtonSave,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div>
      <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__content">
          <div className={`popup__container popup__container_${name}`}>
            <button
              className="popup__close"
              type="button"
              aria-label="кнопка закрытия модального окна"
              onClick={onClose}
            />
            <h2 className="popup__title">{title}</h2>
            <form
              className={`popup__form popup__form_${name}`}
              name={name}
              onSubmit={onSubmit}
            >
              {children}
              <button type="submit" className="popup__button">
                {textButtonSave || "Сохранить"}
              </button> 
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupWithForm;
