
export const classNames = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    errorClass: 'popup__input-error_active'
};



export const editForm = document.querySelector('.popup-edit__form');
export const addForm = document.querySelector('.popup-add__form');
export const avatarForm = document.querySelector('.popup-avatar__form')
export const addButton = document.querySelector('.profile__add-button');
export const editButton = document.querySelector('.profile-info__edit-button');
export const inputName = document.querySelector('#name-input');
export const inputHobby = document.querySelector('#hobby-input');
export const avatarProfile = document.querySelector('.profile__avatar');
export const trashButton = document.querySelector('.element__trash')

// теперь картинки можно импортировать, 
// вебпак добавит в переменные правильные пути 
export const avatar = new URL('../images/Avatar.png', import.meta.url);
export const mgu = new URL('../images/mgu.jpg', import.meta.url);

export const photos = [
    // меняем исходные пути на переменные 
    { name: 'avatar', link: avatar },
    { name: 'mgu', link: mgu }
];
