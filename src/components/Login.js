import React from 'react';
import AuthPage from "./AuthPage";

const Login = () => {
    return (
        <AuthPage title='Вход'
                  buttonText='Войти'
                  formName='sign-in'
        >
                <input name="email"
                       type="email"
                       id="login-email"
                       className="auth__input"
                       placeholder="Email"
                       minLength="4"
                       maxLength="40"
                       required
                />
                <input name="password"
                       type="password"
                       id="login-password"
                       className="auth__input"
                       placeholder="Пароль"
                       minLength="6"
                       maxLength="40"
                       required
                />
        </AuthPage>
    );
};

export default Login;