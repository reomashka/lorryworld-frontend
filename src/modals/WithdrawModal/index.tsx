import type React from "react";
import { useState } from "react";
import { X, User } from "lucide-react";
import styles from "./WithdrawModal.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useModalClose } from "src/hooks/useModalClose";
import { useInventoryItems } from "src/hooks/useInventoryItems";
import { toast } from "react-toastify";

export const WithdrawModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOverlayClick } = useModalClose();
  const { withDrawAllItems } = useInventoryItems();

  const [mediaContact, setMediaContact] = useState("TELEGRAM");
  const [contact, setContact] = useState("");
  const [robloxUsername, setRobloxUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!mediaContact || !contact) {
        toast.warn("Заполните все поля");
        return;
      }

      // 1. Отправляем PATCH запрос
      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaContact, contact }),
      });

      // 2. Проверяем ответ
      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch {
          error = { message: "No JSON response" };
        }
        console.error("Ошибка при обновлении профиля:", error);
        toast.error("Ошибка при сохранении контактов");
        return;
      }

      // 3. Вызовем функцию только после успешного ответа
      await withDrawAllItems({ mediaContact, contact, robloxUsername });

      // 4. Навигация
      navigate("/claim-items", {
        state: {
          backgroundLocation: {
            pathname:
              location.state?.backgroundLocation?.pathname || location.pathname,
            search:
              location.state?.backgroundLocation?.search || location.search,
            hash: location.state?.backgroundLocation?.hash || location.hash,
          },
        },
      });
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
      toast.error("Непредвиденная ошибка");
    }
  };

  const handleMediaContactChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setMediaContact(value);

    if (value === "TELEGRAM" && contact && !contact.startsWith("@")) {
      setContact("@" + contact);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (mediaContact === "TELEGRAM") {
      // Убедимся, что @ всегда первый символ
      if (!value.startsWith("@")) {
        value = "@" + value.replace(/^@+/, "");
      }
    }

    setContact(value);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={() => navigate(-1)}>
          <X size={24} />
        </button>

        <h2 className={styles.modalTitle}>Вывод предметов</h2>
        <p className={styles.modalSubTitle}>Важно! Перепроверьте данные.</p>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <div className={styles.amountSection}>
              <div className={styles.amountInputWrapper}>
                <User className={styles.amountIcon} />
                <select
                  value={mediaContact}
                  onChange={handleMediaContactChange}
                  className={styles.amountInput}
                >
                  {/* <option value="" disabled>
                    Выберите соц. сеть
                  </option> */}
                  <option value="TELEGRAM">Telegram</option>
                  <option value="VK">VK</option>
                  <option value="EMAIL">Email</option>
                </select>
              </div>
            </div>

            <div className={styles.amountSection}>
              <div className={styles.amountInputWrapper}>
                <User className={styles.amountIcon} />
                <input
                  type="text"
                  placeholder={
                    mediaContact === "TELEGRAM"
                      ? "Ваш никнейм в Telegram"
                      : mediaContact === "VK"
                        ? "Ваш никнейм в VK"
                        : mediaContact === "EMAIL"
                          ? "Ваш Email"
                          : "Ваш username/email"
                  }
                  value={contact}
                  onChange={handleContactChange}
                  className={styles.amountInput}
                />
              </div>
            </div>

            <div className={styles.amountSection}>
              <div className={styles.amountInputWrapper}>
                <User className={styles.amountIcon} />
                <input
                  type="text"
                  placeholder="Ваш никнейм в Roblox"
                  value={robloxUsername}
                  onChange={(e) => setRobloxUsername(e.target.value)}
                  className={styles.amountInput}
                />
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            ВЫВЕСТИ
          </button>
        </form>
      </div>
    </div>
  );
};
