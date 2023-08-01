export class Api {
  constructor(option) {
    this._url = option.url;
    this._headers = option.headers;
  }
  _sendingRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._sendingRequest(res));
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._sendingRequest(res));
  }
  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._sendingRequest(res));
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._sendingRequest(res));
  }
   editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => this._sendingRequest(res));
  }
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._sendingRequest(res));
  }
  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._sendingRequest(res));
  }
  dislikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._sendingRequest(res));
  }
}
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "96294ceb-1926-4f54-9c7f-fc4c16b261d1",
    "Content-Type": "application/json",
  },
});
export default api;