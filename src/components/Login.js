import React from 'react';
import AuthPage from "./AuthPage";

const Login = ({onLogin}) => {
    const [values, setValues] = React.useState({});

    function handleChange(event) {
        const { name, value } = event.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(values.password, values.email);
    }

    return (
        <AuthPage title='Вход'
                  buttonText='Войти'
                  formName='sign-in'
                  onSubmit={handleSubmit}
        >
                <input name="email"
                       type="email"
                       id="login-email"
                       value={values.email || ''}
                       className="auth__input"
                       placeholder="Email"
                       minLength="4"
                       maxLength="40"
                       required
                       onChange={handleChange}
                />
                <input name="password"
                       type="password"
                       value={values.password || ''}
                       id="login-password"
                       className="auth__input"
                       placeholder="Пароль"
                       minLength="6"
                       maxLength="40"
                       required
                       onChange={handleChange}
                />
        </AuthPage>
    );
};

export default Login;