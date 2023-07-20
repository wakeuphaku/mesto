export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelectorAll(popupSelector);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._popupSelector.forEach(item => {
      item.addEventListener('click', function (event) {
        if (event.target.classList.contains('popup')) {
          this.close();
        }
      });
    });
  }
}
