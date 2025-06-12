import type React from "react";
import { useState } from "react";
import { X, CreditCard, Smartphone, Coins, Mail, Check } from "lucide-react";
import styles from "./TopupModal.module.scss";
import { useNavigate } from "react-router";
import { useModalClose } from "src/hooks/useModalClose";

export const TopupModal = () => {
  const navigate = useNavigate();
  const { handleOverlayClick } = useModalClose();

  const [amount, setAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"sbp" | "card" | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submitting:", { amount, promoCode, selectedMethod });
  };

  const applyPromoCode = () => {
    // Handle promo code application
    console.log("Applying promo code:", promoCode);
  };

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
              <span className={styles.commission}>Комиссия 0%</span>
            </div>
          </div>

          <div className={styles.formGroup}>
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
          </div>

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
          >
            <Coins size={20} />
            ПОПОЛНИТЬ
          </button>
        </form>
      </div>
    </div>
  );
};
