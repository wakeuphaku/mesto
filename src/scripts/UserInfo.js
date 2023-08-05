export class UserInfo {
  constructor({ name, hobby, avatar }) {
    this._nameElement = document.querySelector(name);
    this._hobbyElement = document.querySelector(hobby);
    this._avatarElement = document.querySelector(avatar);


  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobby: this._hobbyElement.textContent

    };
  }
  setUserInfo({ name, hobby, avatar }) {
    this._nameElement.textContent = name;
    this._hobbyElement.textContent = hobby;
    this._avatarElement.src = avatar;

  }
  changeAvatar(avatar) {
    this._avatarElement.src = avatar
  }

}
