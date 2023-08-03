export class Api {
  constructor(option) {
    this._url = option.url;
   
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
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._sendingRequest(res));
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._sendingRequest(res));
  }
  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => this._sendingRequest(res));
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._sendingRequest(res));
  }
   editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => this._sendingRequest(res));
  }
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._sendingRequest(res));
  }
  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._sendingRequest(res));
  }
  dislikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization:`Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._sendingRequest(res));
  }
}
const api = new Api({
  url: "https://api.iwtar1.nomoreparties.co",
 
});
export default api; 