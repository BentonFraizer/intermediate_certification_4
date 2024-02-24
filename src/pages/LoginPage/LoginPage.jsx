import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login_page.css';
import { ApiRoute, AppRoute } from '../../consts';
import { useAuthContext } from '../../context/authContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuthContext();

  const emailInputChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const passwordInputChangeHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9500${ApiRoute.Login}`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const result = await response.json();
      if (result.success === true) {
        login(result.token, result.user);
        setErrorMessage('');
      } else {
        setErrorMessage(result.message);
      }
      console.log('result', result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h3>Форма входа</h3>
      <div className="form-wrapper">
        <form className="login-form">
          <div className="input-wrapper">
            <label>Email:</label>
            <input type="text" placeholder="Введите email" value={email} onChange={emailInputChangeHandler} />
          </div>
          <div className="input-wrapper">
            <label>Password:</label>
            <input type="password" placeholder="Введите пароль" value={password} onChange={passwordInputChangeHandler} />
          </div>
          <button type="submit" onClick={loginFormSubmitHandler}>
            Войти
          </button>
        </form>
      </div>
      <div className="registrate">
        Ещё нет аккаунта? <br /> <Link to={AppRoute.Registration}>Зарегистрироваться</Link>
      </div>
      <div className="error">{errorMessage && <div className="error-message">{errorMessage}</div>}</div>
    </div>
  );
};
