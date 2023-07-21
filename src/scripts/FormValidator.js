export class FormValidator {
  constructor(classNames, formElement) {
    this._classNames = classNames;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._classNames.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(this._classNames.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classNames.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this._classNames.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._classNames.inactiveButtonClass);
  }

  _enableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._classNames.inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
    });

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
