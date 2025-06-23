import { useState, useRef } from "react";
import { Eye, EyeOff, User, X, Lock } from "lucide-react";
import styles from "./LoginModal.module.scss";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";

import { useModalClose } from "src/hooks/useModalClose";
import { LoginSchema, TypeLoginSchema } from "@components/schemes";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "./useLoginMutation";

export const LoginModal = () => {
  const { handleOverlayClick } = useModalClose(); // Закрытие модалки
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useLoginMutation();

  const onSubmit: SubmitHandler<TypeLoginSchema> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={() => navigate(-1)}>
          ×
        </button>
        <div className={styles.modalContent}>
          <h1>ВХОД В АККАУНТ</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <User size={20} />
              </div>
              <input
                type="text"
                {...register("identifier")}
                placeholder="Email или имя"
                className={errors.identifier ? styles.error : ""}
              />
              {errors.identifier && (
                <div className={styles.errorIcon}>
                  <X size={20} />
                </div>
              )}
            </div>
            {errors.identifier && (
              <div className={styles.errorMessage}>
                {errors.identifier.message}
              </div>
            )}

            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Укажите пароль"
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

            <button
              type="submit"
              className={styles.loginButton}
              disabled={mutation.isPending}
            >
              ВОЙТИ
            </button>
          </form>

          {/* Линк для перехода на бекграунд роут */}
          <Link
            to="/register"
            state={{
              backgroundLocation:
                location.state?.backgroundLocation || location,
            }}
          >
            <div className={styles.createAccount_button}>СОЗДАТЬ АККАУНТ</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
