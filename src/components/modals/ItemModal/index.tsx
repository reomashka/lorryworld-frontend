import type React from 'react';
import { useState } from 'react';
import './ItemModal.scss';

import credit from '../../../assets/svg/credit.svg';
import cart from '../../../assets/svg/cart_two.svg';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    name?: string;
    price?: number;
    type?: string;
    image?: string;
  };
}
export const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose, item }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <button className='close-button' onClick={onClose}>
          ×
        </button>

        <div className='modal-content'>
          <div className='item-image-container'>
            <img
              src={item.image || '/placeholder.svg?height=300&width=300'}
              alt={item.name}
              className='item-image'
            />
          </div>

          <div className='item-details'>
            <h1 className='item-title'>{item.name}</h1>

            <div className='item-specs'>
              {item.type && (
                <div className='spec-row'>
                  <div className='spec-label'>Тип</div>
                  <div className='spec-value'>{item.type}</div>
                </div>
              )}

              <div className='spec-row'>
                <div className='spec-label'>Качество</div>
                <div className='spec-value'>Godly</div>
              </div>

              <div className='spec-row'>
                <div className='spec-label'>Количество</div>
                <div className='spec-value quantity-control'>
                  <button className='quantity-button decrease' onClick={decreaseQuantity}>
                    −
                  </button>
                  <span className='quantity-number'>{quantity}</span>
                  <button className='quantity-button increase' onClick={increaseQuantity}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className='price-section'>
              <h2 className='price'>{item.price} ₽</h2>
            </div>

            <div className='action-buttons'>
              <button className='buy-button'>
                <span className='icon'>
                  <img src={cart} alt='' />
                </span>{' '}
                КУПИТЬ ПРЕДМЕТ
              </button>
              <button className='balance-button'>
                <span className='icon'>
                  <img src={credit} alt='' />
                </span>{' '}
                ПОПОЛНИТЬ БАЛАНС
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
