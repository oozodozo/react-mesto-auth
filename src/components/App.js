import {useEffect, useState} from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeletePlacePopup from "./DeletePlacePopup.js";
import {Switch, Route, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import tooltipImgOk from "../images/tooltip_icon_ok.svg"
import tooltipImgErr from "../images/tooltip_icon_err.svg"
import * as auth from "../utils/auth.js"

const App = () => {
    const history = useHistory();

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [renderLoad, setRenderLoad] = useState(false);
    const [isDeletePlacePopup, setIsDeletePlacePopup] = useState(false);
    const [deletedPlace, setDeletedPlace] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [tooltipData, setTooltipData] = useState({img: '', title: ''});

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        api.getCards()
            .then((cardsData) => {
                setCards(cardsData)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err)
            })
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

    function handleRegister(password, email) {
        auth.register(password, email)
            .then((res) => {
                setTooltipData({img: tooltipImgOk, title: 'Вы успешно зарегистрировались!'});
                history.push('/sign-in');
            })
            .catch(() => {
                setTooltipData({img: tooltipImgErr, title: 'Что-то пошло не так! Попробуйте ещё раз.'});
            })
            .finally(() => {
                setIsInfoTooltipOpen(true);
            })
    }

    function handleLogin(password, email) {
        auth.authorize(password, email)
            .then((token) => {
                auth.getUserData(token)
                    .then((res) => {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch(() => {
                setTooltipData({img: tooltipImgErr, title: 'Что-то пошло не так! Попробуйте ещё раз.'});
                setIsInfoTooltipOpen(true);
            })
    }

    function checkToken() {
        const jwt = localStorage.getItem('jwt');

        if(jwt) {
            auth.getUserData(jwt)
                .then((res) => {
                    if(res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function onSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsDeletePlacePopup(false);
        setIsInfoTooltipOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    onSignOut={onSignOut}
                    email={email}
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
                        <Register
                            onRegister={handleRegister}
                        />
                    </Route>
                    <Route path='/sign-in'>
                        <Login
                            onLogin={handleLogin}
                        />
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
                    isOpen={isInfoTooltipOpen}
                    title={tooltipData.title}
                    img={tooltipData.img}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
