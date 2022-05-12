import React from 'react';

const PopupWithForm = ({name, title, buttonText, isOpen, onClose, children, onSubmit}) => {

    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}
             onClick={e => (e.currentTarget === e.target) && onClose()}
        >
            <div className="popup__container">
                <form className="popup__form"
                      name={name}
                      onSubmit={onSubmit}
                >
                    <h2 className="popup__title">
                        {title}
                    </h2>
                    {children}
                    <button type="submit" className="popup__button-submit">
                        {buttonText}
                    </button>
                </form>
                <button type="reset"
                        className="popup__reset-button page__button"
                        onClick={onClose}
                />
            </div>
        </div>
    );
};

export default PopupWithForm;