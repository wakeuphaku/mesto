import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoName = this._popupSelector.querySelector('.popup-image__text');
    this._photoLink = this._popupSelector.querySelector('.popup-image__photo');
  }
  open({ place, link }) {
    this._photoName.textContent = place;
    this._photoLink.src = link;
    this._photoLink.alt = place;
    super.open();
  }
}
