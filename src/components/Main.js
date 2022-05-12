import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Main = ({onEditAvatar, onAddPlace, onEditProfile, onCardClick, cards, onCardLike, onCardDelete}) => {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    {currentUser.avatar && (<img  className="profile__avatar"
                                          src={currentUser.avatar}
                                          alt='Аватар'
                    />)}
                    <button type="button"
                            className="profile__avatar-button"
                            onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">
                        {currentUser.name}
                    </h1>
                    <button type="button"
                            className="profile__edit-button page__button"
                            onClick={onEditProfile}
                    />
                    <p className="profile__description">
                        {currentUser.about}
                    </p>
                </div>
                <button type="button"
                        className="profile__add-button page__button"
                        onClick={onAddPlace}
                />
            </section>
            <section className="elements">
                {
                    cards.map((card) =>
                        <Card key={card._id}
                              card={card}
                              onCardClick={onCardClick}
                              onCardLike={onCardLike}
                              onCardDelete={onCardDelete}
                        />
                    )
                }
            </section>
        </main>
    );
};

export default Main;