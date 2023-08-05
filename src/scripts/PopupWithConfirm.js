import { Popup } from './Popup.js';
export class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    open(cardId, card) {
        super.open()
        this._cardId = cardId
        this._card = card
    }

    setEventListeners() {
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleSubmit(this._cardId, this._card)
        });
        super.setEventListeners();
        super.close()
    }



}