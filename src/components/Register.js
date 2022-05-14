import React from 'react';
import AuthPage from "./AuthPage";

const Register = ({onRegister}) => {
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
        onRegister(values.password, values.email);
    }

    return (
        <AuthPage title='Регистрация'
                  buttonText='Зарегистрироваться'
                  formName='sign-up'
                  onSubmit={handleSubmit}
        >
            <input name="email"
                   type="email"
                   value={values.email || ''}
                   id="register-email"
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
                   id="register-password"
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

export default Register;