class Api {
  constructor(data) {
    this._url = data.url
    this._headers = data.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  addUserCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch (`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch (`${this._url}/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
        .then(this._checkResponse);
  }

  updateUserAvatar(data) {
    return fetch (`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: '75746050-6371-4856-a99d-2b542822d433',
    'Content-Type': 'application/json'
  }
});

export default api
