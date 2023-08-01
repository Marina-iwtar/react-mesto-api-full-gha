import imgRegistrYes from "../images/successfulRegistration.svg";
import imgRegistrNo from "../images/somethingWentWrong.svg";

function InfoTooltip({ title, isOpen, onClose, imageYesNo }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <div className="popup__container">
          <button
            className="popup__close popup__close_image"
            type="button"
            aria-label="кнопка закрытия модального окна"
            onClick={onClose}
          ></button>
          <img
            src={imageYesNo ? imgRegistrYes : imgRegistrNo}
            className="popup__imageTool"
          />
          <p className="popup__subtitle">{title}</p>
        </div>
      </div>
    </div>
  );
}
export default InfoTooltip;
