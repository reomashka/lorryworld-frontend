import { useState } from 'react';
import { Link } from 'react-router-dom';
import wallet from '../../assets/svg/wallet.svg';
import logo from '../../assets/svg/loog.svg';

export const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className='header'>
      <div className='logo-container'>
        <div className='logo'>
          <img src={logo} alt='' width={113} />
        </div>
        <div className='brand-info'>
          <h1>Lorry World</h1>
          <p>Магазин Murder Mystery 2</p>
        </div>
      </div>

      <nav className='main-nav'>
        <Link className='nav-button shop-button' to='/'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='currentColor'>
            <path d='M4 2H16L19 8V18H1V8L4 2Z' />
          </svg>
          МАГАЗИН
        </Link>
        <button className='nav-button'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='currentColor'>
            <path d='M2 2H8V8H2V2ZM12 2H18V8H12V2ZM2 12H8V18H2V12ZM12 12H18V18H12V12Z' />
          </svg>
          ИНВЕНТАРЬ
        </button>
        <button className='nav-button'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='currentColor'>
            <path d='M10 1C5.03 1 1 5.03 1 10C1 14.97 5.03 19 10 19C14.97 19 19 14.97 19 10C19 5.03 14.97 1 10 1ZM10 17C6.13 17 3 13.87 3 10C3 6.13 6.13 3 10 3C13.87 3 17 6.13 17 10C17 13.87 13.87 17 10 17ZM9 5H11V11H9V5ZM9 13H11V15H9V13Z' />
          </svg>
          ПОМОЩЬ
        </button>
      </nav>

      <div className='user-controls'>
        <div className='language-selector'>
          <button className='lang-button'>
            <span className='flag'>🇷🇺</span>
            RU
            <span className='arrow'>▼</span>
          </button>
        </div>

        <div className='currency-selector'>
          <button className='currency-button'>
            ₽ RUB
            <span className='arrow'>▼</span>
          </button>
        </div>

        <div className='balance'>
          <span className='balance-icon'>
            {' '}
            <img src={wallet} alt='' width={30} />
          </span>
          <span className='balance-amount'>0.00 ₽</span>
        </div>

        <button className='add-funds'>+</button>

        <div className='user-profile'>
          <button className='avatar-button' onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className='avatar'></div>
          </button>

          {showUserMenu && (
            <div className='user-menu'>
              <button className='menu-item'>
                <span className='menu-icon'>
                  <img src={wallet} alt='' />
                </span>
                Пополнить
              </button>
              <button className='menu-item'>
                <span className='menu-icon'>👤</span>
                Профиль
              </button>
              <button className='menu-item'>
                <span className='menu-icon'>🚪</span>
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
