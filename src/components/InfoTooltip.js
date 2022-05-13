import React from 'react';

const InfoTooltip = ({img, title, onClose, isOpen}) => {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <div className='popup__tooltip-container'>
                    <img src={img} alt='icon' className='popup__tooltip-img' />
                    <h2 className='popup__tooltip-title'>{title}</h2>
                    <button type="reset"
                            className="popup__reset-button page__button"
                            onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoTooltip;