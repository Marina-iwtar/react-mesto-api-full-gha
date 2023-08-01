import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef();
  function handleSubmitAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButtonSave="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitAvatar}
    >
      <input
        type="url"
        className="popup__input popup__input_type_url"
        placeholder="Ссылка на картинку"
        id="url-input"
        name="avatar"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
