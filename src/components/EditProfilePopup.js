import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, renderLoad}) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={renderLoad ? 'Сохранение...' : 'Сохранить'}
        >
            <fieldset className="popup__fieldset">
                <input name="name"
                       type="text"
                       id="name"
                       value={name || ''}
                       onChange={handleNameChange}
                       className="popup__input popup__user-name"
                       placeholder="Имя"
                       minLength="2"
                       maxLength="40"
                       pattern="[a-zA-Zа-яА-я\-\s]+$"
                       required
                />
                <span className="popup__error name-error" />
                <input name="about"
                       type="text"
                       id="about"
                       value={description || ''}
                       onChange={handleDescriptionChange}
                       className="popup__input popup__user-about"
                       placeholder="О себе"
                       minLength="2"
                       maxLength="200"
                       pattern="[a-zA-Zа-яА-я\-\s]+$"
                       required
                />
                <span className="popup__error about-error" />
            </fieldset>
        </PopupWithForm>
    );
};

export default EditProfilePopup;