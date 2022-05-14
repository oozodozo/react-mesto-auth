import React from 'react';
import logo from "../images/logo.svg";
import {Link, Route} from "react-router-dom";

const Header = ({loggedIn, email, onSignOut}) => {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            {
                loggedIn ?
                    <div className='header__user-info'>
                        <p className='header__email'>{email}</p>
                        <Link className='header__link header__link_active page__button'
                              to='/sign-in'
                              onClick={onSignOut}
                        >
                            Выйти
                        </Link>
                    </div> :
                    (<>
                        <Route path='/sign-up'>
                            <Link className='header__link page__button' to='/sign-in'>Войти</Link>
                        </Route>
                        <Route path='/sign-in'>
                            <Link className='header__link page__button' to='/sign-up'>Регистрация</Link>
                        </Route>
                    </>)
            }
        </header>
    );
};

export default Header;