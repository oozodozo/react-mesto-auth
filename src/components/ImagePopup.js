import React from 'react';

const ImagePopup = ({card, onClose}) => {

    return (
        <div className={`popup popup_zoom-image ${card && 'popup_opened'}`}
             onClick={e => (e.currentTarget === e.target) && onClose()}
        >
            <div className="popup__figure-container">
                <figure className="popup__figure">
                    <img className="popup__image"
                         src={card && card.link}
                         alt={card && card.name}
                    />
                    <figcaption className="popup__figcaption">
                        {card && card.name}
                    </figcaption>
                </figure>
                <button type="reset"
                        className="popup__reset-button page__button"
                        onClick={onClose}
                />
            </div>
        </div>
    );
};

export default ImagePopup;