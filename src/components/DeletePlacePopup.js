import React from 'react';
import PopupWithForm from "./PopupWithForm";

const DeletePlacePopup = ({isOpen, onClose, onCardDelete, card, renderLoad}) => {

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            name='delete-element'
            title='Вы уверены?'
            buttonText={renderLoad ? 'Удаление...' : 'Да'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
};

export default DeletePlacePopup;