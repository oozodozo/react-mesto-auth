import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash-button page__button ${isOwn ? '' : 'element__trash-button_hidden'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="element">
            <img className="element__image"
                 src={card.link}
                 alt={card.name}
                 onClick={handleCardClick}
            />
            <div className="element__description">
                <h2 className="element__title">
                    {card.name}
                </h2>
                <div className="element__like-container">
                    <button type="button"
                            className={cardLikeButtonClassName}
                            onClick={handleLikeClick}
                    />
                    <span className="element__like-counter">
                        {card.likes.length}
                    </span>
                </div>
            </div>
            <button type="button"
                    className={cardDeleteButtonClassName}
                    onClick={handleDeleteClick}
            />
        </article>
    );
};

export default Card;