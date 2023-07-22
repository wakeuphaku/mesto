export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', evt => this._handleEscClose(evt));
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => this.open());
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', evt => {
      if (evt.currentTarget === evt.target) this.close();
    });
  }
}
