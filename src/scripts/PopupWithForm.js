import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._input = this._form.querySelectorAll('.popup__input');
    const inputValues = {};
    this._input.forEach(item => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }
  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
  close() {
    super.close();
  }
}
