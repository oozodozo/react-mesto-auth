import React from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace, renderLoad}) => {

    const [values, setValues] = React.useState({});

    React.useEffect(() => {
        setValues({
            name: '',
            link: ''
        })
    }, [isOpen])

    function handleChange(event) {
        const { name, value } = event.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

     function handleSubmit(e) {
         e.preventDefault();
         onAddPlace(values);
     }

    return (
        <PopupWithForm
            name='add-element'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            buttonText={renderLoad ? 'Добавление...' : 'Добавить'}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">
                <input name="name"
                       type="text"
                       id="place-title"
                       value={values.name || ''}
                       onChange={handleChange}
                       className="popup__input popup__place-title"
                       placeholder="Название"
                       minLength="2"
                       maxLength="30"
                       pattern="[a-zA-Zа-яА-я\-\s]+$"
                       required />
                <span className="popup__error place-title-error" />
                <input name="link"
                       type="url"
                       id="image-link"
                       value={values.link || ''}
                       onChange={handleChange}
                       className="popup__input popup__image-link"
                       placeholder="Ссылка на картинку"
                       pattern="[a-zA-Zа-яА-я\-\S]+$"
                       required />
                <span className="popup__error image-link-error" />
            </fieldset>
        </PopupWithForm>
    );
};

export default AddPlacePopup;