import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./ItemModal.module.scss";

import credit from "@assets/svg/credit.svg";
import cart from "@assets/svg/cart_two.svg";

import { useModalClose } from "src/hooks/useModalClose";
import { Item } from "@modules/Home/interfaces/Item.interface";

import sword from "@assets/itemsHome/sword.png";
import legendaryCover from "@assets/coversItem/chroma.png";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useProfile } from "src/hooks/useProfile";

export const ItemModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOverlayClick } = useModalClose();

  const [quantity, setQuantity] = useState(1);

  const { isAuthenticated } = useProfile();

  const item: Item = location.state?.item;
  if (!item) return null;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleBuyItem = () => {
    const total = (item.price || 0) * quantity;
    toast.info(`Покупка ${quantity} предмета(ов) на сумму ${total} ₽`);
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => navigate(-1)}>
          ×
        </button>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <div
              className={styles.imageBackground}
              style={{ backgroundImage: `url(${legendaryCover})` }}
            >
              <img
                src={sword}
                alt={item.name || "Item"}
                className={styles.itemImage}
              />
            </div>
          </div>

          <div className={styles.details}>
            <h2 className={styles.title}>{item.name || "Без названия"}</h2>

            <div className={styles.properties}>
              {item.type && (
                <div className={styles.property}>
                  <span className={styles.label}>Тип</span>
                  <span className={styles.value}>{item.type}</span>
                </div>
              )}

              <div className={styles.property}>
                <span className={styles.label}>Качество</span>
                <span className={styles.value}>{item.rarity}</span>
              </div>

              <div className={styles.property}>
                <span className={styles.label}>Количество</span>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.price}>{(item.price || 0) * quantity} ₽</div>

            <div className={styles.actions}>
              {isAuthenticated ? (
                <button className={styles.buyButton} onClick={handleBuyItem}>
                  <img src={cart} alt="" className={styles.icon} />
                  КУПИТЬ ПРЕДМЕТ
                </button>
              ) : (
                <Link
                  className={styles.buyButton}
                  to="/login"
                  state={{
                    backgroundLocation:
                      location.state?.backgroundLocation || location,
                  }}
                >
                  <img src={cart} alt="" className={styles.icon} />
                  КУПИТЬ ПРЕДМЕТ
                </Link>
              )}

              {isAuthenticated ? (
                <Link
                  className={styles.balanceButton}
                  to="/topup"
                  state={{
                    backgroundLocation:
                      location.state?.backgroundLocation || location,
                  }}
                >
                  <img src={credit} alt="" className={styles.icon} />
                  ПОПОЛНИТЬ БАЛАНС
                </Link>
              ) : (
                <Link
                  className={styles.balanceButton}
                  to="/login"
                  state={{
                    backgroundLocation:
                      location.state?.backgroundLocation || location,
                  }}
                >
                  <img src={credit} alt="" className={styles.icon} />
                  ПОПОЛНИТЬ БАЛАНС
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
