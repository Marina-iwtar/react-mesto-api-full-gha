import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose,  onUpdateUser }) {
const currentUser = useContext(CurrentUserContext);
const [name, setName] = useState(" ");
const [description, setDescription] = useState(" ");

useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser,isOpen]); 

function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  // Передаём значения управляемых компонентов во внешний обработчик
  onUpdateUser({
    name,
    about: description,
  });
} 
function handleChangeName(e) {
  setName(e.target.value);
}
function handleChangeAbout(e) {
  setDescription(e.target.value);
}
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textButtonSave="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit = {handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        id="name-input"
        name="name"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        className="popup__input popup__input_type_about-my"
        placeholder="О себе"
        id="aboutMy-input"
        name="about"
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={handleChangeAbout}
      />
      <span className="popup__input-error aboutMy-input-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
