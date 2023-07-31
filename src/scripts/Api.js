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
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}