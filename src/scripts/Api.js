export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.token

  }

  userInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-72/users/me', {
      headers: {
        authorization: 'b176578c-765a-482e-945d-4755e5874088'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }
  getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-72/cards', {
      headers: {
        authorization: 'b176578c-765a-482e-945d-4755e5874088'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  editProfile(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-72/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'b176578c-765a-482e-945d-4755e5874088',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.hobby
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  getNewCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-72/cards', {
      method: 'POST',
      headers: {
        authorization: 'b176578c-765a-482e-945d-4755e5874088',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  deleteCard(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-72/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'b176578c-765a-482e-945d-4755e5874088'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  getLike(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-72/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'b176578c-765a-482e-945d-4755e5874088'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  deleteLike(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-72/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'b176578c-765a-482e-945d-4755e5874088'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}