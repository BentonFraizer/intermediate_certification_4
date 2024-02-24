import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration_page.css';
import { ApiRoute, AppRoute } from '../../consts';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailInputChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const passwordInputChangeHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const registrationFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9500${ApiRoute.Registration}`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const result = await response.json();
      console.log('result', result);
      if (result.success === true) {
        navigate(AppRoute.Login);
        setErrorMessage('');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registration">
      <h3>Форма регистрации</h3>
      <div className="form-wrapper">
        <form>
          <div className="input-wrapper">
            <label>Email:</label>
            <input type="text" placeholder="Введите email" value={email} onChange={emailInputChangeHandler} />
          </div>
          <div className="input-wrapper">
            <label>Password:</label>
            <input type="text" placeholder="Введите пароль" value={password} onChange={passwordInputChangeHandler} />
          </div>
          <button type="submit" onClick={registrationFormSubmitHandler}>
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className="error">{errorMessage && <div className="error-message">{errorMessage}</div>}</div>
    </div>
  );
};
