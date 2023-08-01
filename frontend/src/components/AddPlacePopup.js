import React, { useState,  useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmitMesto(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  function handleChangeNameMesto(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="mesto"
      title="Новое место"
      textButtonSave="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitMesto}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name-mesto"
        placeholder="Название"
        id="place-input"
        name="name"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleChangeNameMesto}
      />
      <span className="popup__input-error place-input-error"></span>
      <input
        type="url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        id="link-input"
        name="link"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
