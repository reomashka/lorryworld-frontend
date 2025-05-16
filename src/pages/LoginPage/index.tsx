import { Header } from "@components/Header";
import { useState } from "react";
import "./LoginPage.scss";

export const LoginPage = () => {
  const [username, setUsername] = useState("daja567");
  const [password, setPassword] = useState("12345678910");
  const [usernameError, setUsernameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const clearUsername = () => {
    setUsername("");
    setUsernameError(false);
  };

  const clearPassword = () => {
    setPassword("");
    setPasswordError(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="login-container">
            <div className="login-form">
              <h1 className="login-title">ВХОД В АККАУНТ</h1>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="input-wrapper">
                    <span className="input-icon user-icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                          fill="#E53935"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      className={usernameError ? "error" : ""}
                    />
                    {username && (
                      <span
                        className="error-icon clear-field"
                        onClick={clearUsername}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM12 10.872L10.872 12L8 9.128L5.128 12L4 10.872L6.872 8L4 5.128L5.128 4L8 6.872L10.872 4L12 5.128L9.128 8L12 10.872Z"
                            fill="#E53935"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  {usernameError && (
                    <div className="error-message">данные введены неверно</div>
                  )}
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <span className="input-icon password-icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V9C16 7.9 15.1 7 14 7ZM8 12C6.9 12 6 11.1 6 10C6 8.9 6.9 8 8 8C9.1 8 10 8.9 10 10C10 11.1 9.1 12 8 12ZM11.1 7H4.9V5C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7Z"
                          fill="#E53935"
                        />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      className={passwordError ? "error" : ""}
                    />
                    <span
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 3C4.667 3 1.82 5.073 0 8C1.82 10.927 4.667 13 8 13C11.333 13 14.18 10.927 16 8C14.18 5.073 11.333 3 8 3ZM8 11.5C6.067 11.5 4.5 9.933 4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6Z"
                            fill="#E53935"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 3C4.667 3 1.82 5.073 0 8C1.82 10.927 4.667 13 8 13C11.333 13 14.18 10.927 16 8C14.18 5.073 11.333 3 8 3ZM8 11.5C6.067 11.5 4.5 9.933 4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6Z"
                            fill="#E53935"
                          />
                          <line
                            x1="2"
                            y1="14"
                            x2="14"
                            y2="2"
                            stroke="#E53935"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </span>
                    {password && (
                      <span
                        className="error-icon clear-field"
                        onClick={clearPassword}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM12 10.872L10.872 12L8 9.128L5.128 12L4 10.872L6.872 8L4 5.128L5.128 4L8 6.872L10.872 4L12 5.128L9.128 8L12 10.872Z"
                            fill="#E53935"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  {passwordError && (
                    <div className="error-message">данные введены неверно</div>
                  )}
                </div>

                <button type="submit" className="login-button">
                  ВОЙТИ <span className="arrow">→</span>
                </button>

                <button type="button" className="create-account-button">
                  СОЗДАТЬ АККАУНТ
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
