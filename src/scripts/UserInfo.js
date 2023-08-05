export class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameElement = document.querySelector(name);
    this._hobbyElement = document.querySelector(about);
    this._avatarElement = document.querySelector(avatar);


  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobby: this._hobbyElement.textContent

    };
  }
  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._hobbyElement.textContent = about;
    this._avatarElement.src = avatar;

  }
  changeAvatar(avatar) {
    this._avatarElement.src = avatar
  }

}
