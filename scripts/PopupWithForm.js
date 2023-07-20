import { Popup } from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(submitButton, popupSelector) {
    super(popupSelector);
    this._submitButton = submitButton;
    this._form = document.querySelector('.popup__form');
  }
  _getInputValues() {
    this._input = document.querySelectorAll('.popup__input');
    const inputValues = {};
    this._input.forEach(item => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }
  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitButton(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
