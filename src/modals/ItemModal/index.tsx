import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "./ItemModal.module.scss";

import credit from "@assets/svg/credit.svg";
import cart from "@assets/svg/cart_two.svg";

import { useModalClose } from "src/hooks/useModalClose";
import { Item } from "@sharedTypes/item.interface";
import { useProfile } from "src/hooks/useProfile";
import { userStore } from "src/store/userStore";
import { useQuantity } from "./hooks/useQuantity";
import { useBuyItem } from "./hooks/useBuyItem";

import { observer } from "mobx-react-lite";

import rarityItemMap from "src/constants/rarityItemMap";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { updateItemPrice as updateItemPriceApi } from "src/api/updateItemPrice";
import { toast } from "react-toastify";

export const ItemModal = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOverlayClick } = useModalClose();
  const { quantity, increase, decrease } = useQuantity(1);
  const { user, isAuthenticated, isAdmin } = useProfile();
  const { mutate: buyItem, isPending } = useBuyItem();

  const item: Item = location.state?.item;
  const [price, setPrice] = useState(item.price || 0);
  const [sale, setSale] = useState(item.sale || 0);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden"; // блокируем скролл
    return () => {
      document.body.style.overflow = originalStyle; // возвращаем обратно
    };
  }, []);

  if (!item) return null;

  const handleBuy = () => {
    if (!user) return;

    buyItem(
      { item, quantity, user },
      {
        onSuccess: () => {
          userStore.fetchProfile();
        },
      }
    );
  };

  type RarityKey = keyof typeof rarityItemMap;

  const typeNames: Record<string, string> = {
    PISTOL: "Пистолет",
    KNIFE: "Нож",
    PET: "Пет",
    SET: "Сет",
    FRUITS: "Fruits",
    GIANTPETS: "Giant Pets",
    PETS: "Pets",
    BUNDLES: "Bundles",
  };

  const priceToUse = sale && sale > 0 ? sale : price || 0;

  const { mutate: savePrice, isPending: isSaving } = useMutation({
    mutationFn: ({
      id,
      price,
      sale,
    }: {
      id: number;
      price: number;
      sale: number;
    }) => updateItemPriceApi(id, price, sale),
    onSuccess: (data) => {
      setPrice(data.price);
      setSale(data.sale);
      toast.success("Цена обновлена!");
    },
  });

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
                backgroundImage: `url(${
                  rarityItemMap[item.rarity as RarityKey]
                })`,
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
                  <span className={styles.value}>
                    {typeNames[item.type] || item.type}
                  </span>
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
                    onClick={decrease}
                    disabled={isPending}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={increase}
                    disabled={isPending}
                  >
                    +
                  </button>
                </div>
              </div>

              {isAdmin && (
                <>
                  <div className={styles.property}>
                    <span className={styles.label}>Цена</span>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={price}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          setPrice(Number(value));
                        }
                      }}
                    />
                  </div>

                  <div className={styles.property}>
                    <span className={styles.label}>Цена со скидкой</span>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={sale}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          setSale(Number(value));
                        }
                      }}
                      placeholder="0 — без скидки"
                    />
                  </div>
                  <button
                    className={styles.saveButton}
                    onClick={() => savePrice({ id: item.id, price, sale })}
                    disabled={isSaving}
                  >
                    Сохранить
                  </button>
                </>
              )}
            </div>

            <div className={styles.price}>{priceToUse * quantity} ₽</div>

            <div className={styles.actions}>
              {isAuthenticated ? (
                <button
                  className={styles.buyButton}
                  onClick={handleBuy}
                  disabled={isPending}
                >
                  <img src={cart} alt="" className={styles.icon} />
                  {isPending ? "Покупка..." : "КУПИТЬ ПРЕДМЕТ"}
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

              <Link
                className={styles.balanceButton}
                to={isAuthenticated ? "/topup" : "/login"}
                state={{
                  backgroundLocation:
                    location.state?.backgroundLocation || location,
                }}
              >
                <img src={credit} alt="" className={styles.icon} />
                ПОПОЛНИТЬ БАЛАНС
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
