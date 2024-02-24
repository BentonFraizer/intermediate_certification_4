import React from 'react';
import './header.css';
import { useAuthContext } from '../../context/authContext';

export const Header = () => {
  const { user, logout } = useAuthContext();

  const logoutHandler = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-title">Это компонент header</div>

      {user ? (
        <div className="header-user" title="Выйти из аккаунта" onClick={logoutHandler}>
          <div className="user-name">{user}</div>
          <div className="user-avatar">
            <img src="https://i.pravatar.cc/300" alt="avatar" />
          </div>
        </div>
      ) : null}
    </header>
  );
};
