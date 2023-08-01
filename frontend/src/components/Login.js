import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Auth from "./Auth";
import Header from "./Header";

function Login({ handleLogin,  setTitleError, setInfoTooltip, setUserEmail }) {
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  }
  const navigate = useNavigate();

  function handleSubmitLogin(e) {
    e.preventDefault();
    Auth.login(loginValue.email, loginValue.password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setUserEmail(data.email);
        handleLogin();
        navigate("/");
      })
      .catch((err) => {
        setInfoTooltip(true);
        //setImageYesNo(true);
        setTitleError("Что-то пошло не так! Попробуйте еще раз.");
        console.log(`Ошибка ${err}`);
      });
  }

  return (
    <div>
      <Header path="/sign-up" nameButton="Регистрация" />
      <div className="contents">
        <form
          className="contents__form"
          name="login"
          onSubmit={handleSubmitLogin}
        >
          <h2 className="contents__title">Вход</h2>
          <input
            onChange={handleChange}
            value={loginValue.email}
            type="text"
            className="contents__input contents__input_type_email"
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
            value={loginValue.password}
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
