import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className='header'>
      <h1>CRUD Blog App</h1>
      <nav>
        <ul className='header__nav-link'>
          <li
            className={`header__nav-link__item ${
              location.pathname === '/' ? 'header__nav-link__item--active' : ''
            }`}
          >
            <Link to='/'>Home</Link>
          </li>
          <li
            className={`header__nav-link__item ${
              location.pathname.includes('/post')
                ? 'header__nav-link__item--active'
                : ''
            }`}
          >
            <Link to='post'>Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
