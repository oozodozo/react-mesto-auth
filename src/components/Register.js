import React from 'react';
import AuthPage from "./AuthPage";

const Register = () => {
    return (
        <AuthPage title='Регистрация'
                  buttonText='Зарегистрироваться'
                  formName='sign-up'
        >
            <input name="email"
                   type="email"
                   id="register-email"
                   className="auth__input"
                   placeholder="Email"
                   minLength="4"
                   maxLength="40"
                   required
            />
            <input name="password"
                   type="password"
                   id="register-password"
                   className="auth__input"
                   placeholder="Пароль"
                   minLength="6"
                   maxLength="40"
                   required
            />
        </AuthPage>
    );
};

export default Register;