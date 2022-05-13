import React from 'react';
import {Link} from "react-router-dom";

const AuthPage = ({children, title, buttonText, formName}) => {
    return (
        <div className='auth'>
            <form className='auth__form'
                  name={formName}
            >
                <h2 className='auth__title'>
                    {title}
                </h2>
                <fieldset className="auth__fieldset">
                    {children}
                </fieldset>
                <button type="submit"
                        className="auth__button-submit">
                    {buttonText}
                </button>
                {
                    formName === 'sign-up' && <Link className='auth__link page__button' to='/sing-in'>Уже зарегистрированы? Войти</Link>
                }
            </form>
        </div>
    );
};

export default AuthPage;