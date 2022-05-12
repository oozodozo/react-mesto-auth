import React from 'react';
import logo from "../images/logo.svg";
import {Link, useLocation} from "react-router-dom";

const Header = () => {
    const location = useLocation()

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место" />
            {
                location.pathname === '/sing-in' ?
                    <Link className='header__link' to='/sing-up'>Регистрация</Link> :
                    <Link className='header__link' to='/sing-in'>Войти</Link>
            }
        </header>
    );
};

export default Header;