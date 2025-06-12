import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, X, Lock, Mail } from "lucide-react";
import styles from "./RegistrationModal.module.scss";
import { useModalClose } from "src/hooks/useModalClose";
import { Link, useNavigate } from "react-router";
import { RegisterSchema, TypeRegisterSchema } from "@components/schemes";

export const RegistrationModal = () => {
  const { handleOverlayClick } = useModalClose();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TypeRegisterSchema) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          passwordRepeat: data.passwordReapeat,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        alert(
          "Ошибка при регистрации: " + (resData.message || "Неизвестная ошибка")
        );
        return;
      }

      alert("Регистрация прошла успешно!");
      navigate("/");
    } catch (err) {
      console.error("Ошибка запроса:", err);
      alert("Произошла ошибка сети.");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      {" "}
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={() => navigate(-1)}>
          ×
        </button>
        <div className={styles.modalContent}>
          <h1>СОЗДАНИЕ АККАУНТА</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="Придумайте никнейм"
                {...register("name")}
                className={errors.name ? styles.error : ""}
              />
              {errors.name && (
                <div className={styles.errorIcon}>
                  <X size={20} />
                </div>
              )}
            </div>
            {errors.name && (
              <div className={styles.errorMessage}>{errors.name.message}</div>
            )}

            {/* Password */}
            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Придумайте пароль"
                {...register("password")}
                className={errors.password ? styles.error : ""}
              />
              <div
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && (
                <div className={styles.errorIcon}>
                  <X size={20} />
                </div>
              )}
            </div>
            {errors.password && (
              <div className={styles.errorMessage}>
                {errors.password.message}
              </div>
            )}

            {/* Repeat Password */}
            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Повторите пароль"
                {...register("passwordReapeat")}
                className={errors.passwordReapeat ? styles.error : ""}
              />
              {errors.passwordReapeat && (
                <div className={styles.errorIcon}>
                  <X size={20} />
                </div>
              )}
            </div>
            {errors.passwordReapeat && (
              <div className={styles.errorMessage}>
                {errors.passwordReapeat.message}
              </div>
            )}

            {/* Email */}
            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <Mail size={20} />
              </div>
              <input
                type="text"
                placeholder="Email (необязательно)"
                {...register("email")}
                className={errors.email ? styles.error : ""}
              />
              {errors.email && (
                <div className={styles.errorIcon}>
                  <X size={20} />
                </div>
              )}
            </div>
            {errors.email && (
              <div className={styles.errorMessage}>{errors.email.message}</div>
            )}

            {/* Checkbox */}
            <div className={styles.checkboxContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                />
                <span>
                  Я согласен с{" "}
                  <Link to="#" target="_blank" rel="noopener noreferrer">
                    политикой конфиденциальности
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.registerButton}
              disabled={!agree}
            >
              <p> СОЗДАТЬ АККАУНТ</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
