export class UserInfo {
  constructor(name, hobby) {
    this._nameElement = document.querySelector(name);
    this._hobbyElement = document.querySelector(hobby);

  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobby: this._hobbyElement.textContent

    };
  }
  setUserInfo({ name, hobby }) {
    this._nameElement.textContent = name;
    this._hobbyElement.textContent = hobby;
  }

}
