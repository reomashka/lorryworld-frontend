import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ItemModal.module.scss";

import credit from "@assets/svg/credit.svg";
import cart from "@assets/svg/cart_two.svg";

import { useModalClose } from "src/hooks/useModalClose";
import { Item } from "@interfaces/Item.interface";

import { Link } from "react-router";
import { useProfile } from "src/hooks/useProfile";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { fetchProfile } from "src/store/userSlice";
import { useQuantity } from "./hooks/useQuantity";
import { buyItem } from "./utils/buyItem";

import GodlyCover from "@assets/coversItem/godly.png";
import AncientsCover from "@assets/coversItem/ancients.png";
import ChromaCover from "@assets/coversItem/chroma.png";
import CorruptCover from "@assets/coversItem/corrupt.png";
import VintagesCover from "@assets/coversItem/vintages.png";

export const ItemModal = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOverlayClick } = useModalClose();
  const { quantity, increase, decrease } = useQuantity(1);
  const { user, isAuthenticated } = useProfile();

  const item: Item = location.state?.item;
  if (!item) return null;

  const handleBuy = async () => {
    if (!user) return;
    const success = await buyItem(item, quantity, user);
    if (success) dispatch(fetchProfile());
  };

  const rarityItemMap = {
    Vintages: VintagesCover,
    Godly: GodlyCover,
    Chroma: ChromaCover,
    Ancients: AncientsCover,
    Corrupt: CorruptCover,
  } as const;

  type RarityKey = keyof typeof rarityItemMap;

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
              style={{
                backgroundImage: `url(${rarityItemMap[item.rarity as RarityKey]})`,
              }}
            >
              <img
                src={`/uploads/${item.icon}.webp`}
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
                    onClick={() => decrease()}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => increase()}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.price}>{(item.price || 0) * quantity} ₽</div>

            <div className={styles.actions}>
              {isAuthenticated ? (
                <button className={styles.buyButton} onClick={handleBuy}>
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
