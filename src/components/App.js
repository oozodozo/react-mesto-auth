import React, {useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import {Switch, Route} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import tooltipImgOk from "../images/tooltip_icon_ok.svg"
import tooltipImgErr from "../images/tooltip_icon_err.svg"

const App = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [renderLoad, setRenderLoad] = React.useState(false);
    const [isDeletePlacePopup, setIsDeletePlacePopup] = React.useState(false);
    const [deletedPlace, setDeletedPlace] = React.useState({});

    const [loggedIn, setLoggedIn] = useState(false);

    React.useEffect(() => {
        api.getCards()
            .then((cardsData) => {
                setCards(cardsData)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    React.useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    React.useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
            console.log('ups');
        });
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleDeletePlaceClick(card) {
        setIsDeletePlacePopup(!isDeletePlacePopup);
        setDeletedPlace(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleCardDelete(card) {
        setRenderLoad(true);
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => item !== card));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setRenderLoad(false);
            })
    }

    function handleAddPlaceSubmit(cardData) {
        setRenderLoad(true);
        api.addUserCard(cardData)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setRenderLoad(false);
            })
    }

    function handleUpdateUser(userData) {
        setRenderLoad(true);
        api.setUserInfo(userData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setRenderLoad(false);
            })
    }

    function handleUpdateAvatar(userData) {
        setRenderLoad(true);
        api.updateUserAvatar(userData)
            .then((data) => {
                setCurrentUser((data));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setRenderLoad(false);
            })
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsDeletePlacePopup(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={false}
                />
                <Switch>
                    <ProtectedRoute
                        exact path='/'
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeletePlaceClick}
                    />
                    <Route path='/sign-up'>
                        <Register />
                    </Route>
                    <Route path='/sign-in'>
                        <Login />
                    </Route>
                </Switch>
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    renderLoad={renderLoad}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    renderLoad={renderLoad}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <DeletePlacePopup
                    isOpen={isDeletePlacePopup}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    card={deletedPlace}
                    renderLoad={renderLoad}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    renderLoad={renderLoad}
                />
                <InfoTooltip
                    isOpen={false}
                    title={'dscsdv'}
                    img={'dsvsdv'}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
