import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitButton) {
    super(popupSelector);
    this._submitButton = submitButton;
    this._form = this._popupSelector.querySelector('.popup__form');
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
    super.setEventListeners();
  }
  close() {
    super.close();
  }
}
