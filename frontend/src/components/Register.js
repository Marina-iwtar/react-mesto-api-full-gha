import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Auth} from "../utils/Auth";
import Header from "./Header";

function Register({ setInfoTooltip, setTitleError, setImageYesNo }) {
  const [registerValue, setRegisterValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterValue({
      ...registerValue,
      [name]: value,
    });
  }
  const navigate = useNavigate();

  function handleSubmitRegister(e) {
    e.preventDefault();
    const { email, password } = registerValue;
    Auth.register(email, password)
      .then((data) => {
        navigate("/sign-in");
        setInfoTooltip(true);
        setImageYesNo(true);
        setTitleError("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setInfoTooltip(true);
        setTitleError("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  return (
    <div>
      <Header path="/sign-in" nameButton="Войти" />
      <div className="contents">
        <form
          className="contents__form"
          name="register"
          noValidate
          onSubmit={handleSubmitRegister}
        >
          <h2 className="contents__title">Регистрация</h2>
          <input
            onChange={handleChange}
            value={registerValue.email}
            type="email"
            className="contents__input content__input_type_email"
            placeholder="Email"
            id="email-input"
            name="email"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="contents__input-error email-input-error"></span>
          <input
            onChange={handleChange}
            value={registerValue.password}
            type="password"
            className="contents__input contents__input_type_password"
            placeholder="Пароль"
            id="password-input"
            name="password"
            minLength="2"
            maxLength="200"
             required
          />
          <span className="contents__input-error password-input-error"></span>
          <button type="submit" className="contents__button">
            Зарегистрироваться
          </button>
          <h3 className="contents__subtitle">
            Уже зарегистрированы?&nbsp;
            <Link to="/sign-in" className="contents__link">
              Войти
            </Link>
          </h3>
        </form>
      </div>
    </div>
  );
}
export default Register;
