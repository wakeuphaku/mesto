export default class UserInfo {
  constructor(nameElement, hobbyElement) {
    this._nameElement = document.querySelector(nameElement);
    this._hobbyElement = document.querySelector(hobbyElement);
  }
  getUserInfo() {
    const userName = this._nameElement.textContent;
    const userHobby = this._hobbyElement.textContent;
    return { userName, userHobby };
  }
  setUserInfo(userName, userHobby) {
    this._nameElement = userName;
    this._hobbyElement = userHobby;
  }
}
