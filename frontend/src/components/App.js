//import Header from "./Header";
import Main from "./Main.js";
//import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import Login from "./Login";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import * as Auth from "./Auth";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [imageYesNo, setImageYesNo] = useState(false);

  useEffect(() => {
   
    Promise.all([api.getInitialCards(), api.getUserData()])
      .then(([cards, res]) => {
        setCards(cards);
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }, []);
  
  useEffect(() => {
    checkToken();
  }, [loggedIn]);


  function handleUpdateUser(card) {
    api
      .editProfile(card)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleUpdateAvatar(card) {
    api
      .editAvatar(card)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }
  function handleUpdateMesto(card) {
    api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((err) => console.log(`Ошибка ${err}`));
    } else {
      api
        .dislikeCard(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  }

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleRegister() {
    setLoggedIn(true);
  }

  function checkToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      Auth.getContent(token)
        .then((data) => {
          if (!data) {
            return;
          }
          setLoggedIn(true);
          navigate("/");
          setUserEmail(data.data.email);
        })
        .catch(() => {
          setLoggedIn(false);
        });
    }
  }
  


  function goOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Register
                  handleRegister={handleRegister}
                  setInfoTooltip={setInfoTooltip}
                  setTitleError={setTitleError}
                  setImageYesNo={setImageYesNo}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  handleLogin={handleLogin}
                  setUserEmail = {setUserEmail}
                  setTitleError={setTitleError}
                  setImageYesNo={setImageYesNo}
                  setInfoTooltip={setInfoTooltip}
                />
              }
            />
            <Route
              path="/react-mesto-auth"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  userEmail={userEmail}
                  onClick={goOut}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
          </Routes>

          <ImagePopup
            onClose={closeAllPopup}
            card={selectedCard}
            name="image"
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            onAddPlace={handleUpdateMesto}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверенны?"
            textButtonSave="Да"
            //isOpen={}
            onClose={closeAllPopup}
          />
          <InfoTooltip
            onClose={closeAllPopup}
            isOpen={infoTooltip}
            title={titleError}
            imageYesNo={imageYesNo}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
