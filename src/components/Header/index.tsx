import { useState } from 'react';
import { Link } from 'react-router-dom';
import wallet from '../../assets/svg/wallet.svg';
import logo from '../../assets/svg/logo.svg';
import avatar from '../../assets/avatar.png';
import cart from '../../assets/svg/cart.svg';
import info from '../../assets/svg/info.svg';
import inventory from '../../assets/svg/inventory.svg';
import russiaFlag from '../../assets/svg/russiaFlag.svg';

export const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className='header'>
      <div className='ccc'>
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
            <img src={cart} alt='' />
            МАГАЗИН
          </Link>
          <Link className='nav-button' to='/'>
            <img src={inventory} alt='' />
            ИНВЕНТАРЬ
          </Link>
          <Link className='nav-button' to='/'>
            <img src={info} alt='' />
            ПОМОЩЬ
          </Link>
        </nav>
      </div>

      <div className='user-controls'>
        <div className='language-selector'>
          <button className='lang-button'>
            <span className='flag'>
              <img src={russiaFlag} height={20} />
            </span>
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
          <span className='balance-amount'>1200 ₽</span>
          <button className='add-funds'>+</button>
        </div>

        <div className='user-profile'>
          <button className='avatar-button' onClick={() => setShowUserMenu(!showUserMenu)}>
            <img src={avatar} alt='' onClick={() => setShowUserMenu(!showUserMenu)} />
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
