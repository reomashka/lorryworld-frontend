import type React from "react";
import { useState } from "react";
import { X, CreditCard, Smartphone, Coins } from "lucide-react";
import styles from "./TopupModal.module.scss";
import { useNavigate } from "react-router-dom";
import { useModalClose } from "src/hooks/useModalClose";
import { useProfile } from "src/hooks/useProfile";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";

export const TopupModal = observer(() => {
  const navigate = useNavigate();
  const { handleOverlayClick } = useModalClose();

  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"sbp" | "card" | null>(
    null
  );
  const { user } = useProfile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !user?.id) return;

    try {
      console.log("User ID:", user?.id);

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          sum: Number(amount),
        }),
      });

      const data = await response.json();
      console.log("Payment created:", data);

      const url = data.resultPayment?.data?.url;
      window.location.href = url;
    } catch (err) {
      console.error("Ошибка при создании платежа:", err);
    }
  };

  // const applyPromoCode = () => {
  //   // Handle promo code application
  //   console.log("Applying promo code:", promoCode);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[1-9][0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={() => navigate(-1)}>
          <X size={24} />
        </button>

        <h2 className={styles.modalTitle}>ПОПОЛНЕНИЕ СЧЕТА</h2>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <div className={styles.amountSection}>
              <div className={styles.amountInputWrapper}>
                <Coins className={styles.amountIcon} />
                <input
                  type="text"
                  placeholder="Сумма"
                  value={amount}
                  onChange={handleChange}
                  className={styles.amountInput}
                />
              </div>
              {/* <span className={styles.commission}>Комиссия 0%</span> */}
            </div>
            <span className={styles.commission}>Комиссия 0%</span>
          </div>

          {/* <div className={styles.formGroup}>
            <div className={styles.promoSection}>
              <div className={styles.promoInputWrapper}>
                <Mail className={styles.amountIcon} />
                <input
                  type="text"
                  placeholder="Промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={styles.promoInput}
                />{" "}
                <button
                  type="button"
                  onClick={applyPromoCode}
                  className={styles.promoApplyIcon}
                  disabled={!promoCode.trim()}
                >
                  <Check size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
            {promoCode}
          </div> */}

          <div className={styles.paymentMethods}>
            <h3 className={styles.paymentTitle}>ВЫБЕРИТЕ МЕТОД ПОПОЛНЕНИЯ</h3>

            <div className={styles.paymentOptions}>
              <button
                type="button"
                className={`${styles.paymentOption} ${
                  selectedMethod === "sbp" ? styles.active : ""
                }`}
                onClick={() => setSelectedMethod("sbp")}
              >
                <Smartphone size={20} />
                СБП
              </button>

              <button
                type="button"
                className={`${styles.paymentOption} ${
                  selectedMethod === "card" ? styles.active : ""
                }`}
                onClick={() => setSelectedMethod("card")}
              >
                <CreditCard size={20} />
                КАРТА РФ
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!amount || !selectedMethod}
            onClick={(e) => {
              if (Number(amount) < 3) {
                e.preventDefault();
                toast.error("Минимальная сумма пополнения 3 рублей");
              }
            }}
          >
            <Coins size={20} />
            ПОПОЛНИТЬ
          </button>
        </form>
      </div>
    </div>
  );
});
