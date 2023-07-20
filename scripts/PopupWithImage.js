import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoName = this._popupSelector.document.querySelector('popup-image__text');
    this._photoLink = this._popupSelector.document.querySelector('popup-image__photo');
  }
  open(name, link) {
    this._photoName.textContent = name;
    this._photoLink.src = link;
    this._photoLink.alt = name;
  }
}
