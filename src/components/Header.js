import React from 'react';
import logo from "../images/logo.svg";
import {Link, useLocation} from "react-router-dom";

const Header = () => {
    const location = useLocation()

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            {
                location.pathname === '/sign-in' ?
                    <Link className='header__link page__button' to='/sign-up'>Регистрация</Link> :
                    <Link className='header__link page__button' to='/sign-in'>Войти</Link>
            }
        </header>
    );
};

export default Header;