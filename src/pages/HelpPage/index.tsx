import { Header } from "@components/Header";
import "./HelpPage.scss";

export const HelpPage = () => {
  return (
    <div className="help-page">
      <Header />
      <div className="help-container">
        <header className="help-header">
          <span className="help-icon">?</span>
          <h1>Помощь по сайту</h1>
        </header>

        <div className="help-sections">
          <div className="help-card">
            <div className="card-header">
              <span className="card-icon">👤</span>
              <h2>Регистрация</h2>
            </div>
            <div className="card-content">
              <div className="step">
                <strong>Шаг 1:</strong> Нажмите{" "}
                <span className="highlight green">«Войти»</span> →{" "}
                <span className="highlight green">«Новый аккаунт»</span>.
              </div>
              <div className="step">
                <strong>Шаг 2:</strong> Придумайте{" "}
                <span className="highlight">любые</span> данные (логин, пароль){" "}
                <span className="highlight">на английском</span>.
              </div>
              <div className="step warning">
                <strong>Важно:</strong> Не вводите данные от игрового аккаунта!
              </div>
              <div className="step">
                Пожалуйста,{" "}
                <span className="highlight">
                  сохраните где-нибудь ваши данные
                </span>
                , чтобы не потерять доступ к аккаунту
              </div>
            </div>
          </div>

          <div className="help-card">
            <div className="card-header">
              <span className="card-icon">💳</span>
              <h2>Пополнение баланса</h2>
            </div>
            <div className="card-content">
              <div className="step">
                <strong>Шаг 1:</strong> Нажмите{" "}
                <span className="highlight orange">оранжевый плюс (+)</span> в
                правом углу.
              </div>
              <div className="step">
                <strong>Минимальная сумма:</strong> 10 ₽.
              </div>
              <div className="step">
                <strong>Способы оплаты:</strong>
                <br />
                <span className="highlight">СБП</span> (работает с большинством
                банков РФ).
              </div>
              <div className="step">
                <strong>Банковские карты МИР</strong>
              </div>
              <div className="step warning">
                <strong>Важно для телефона:</strong> Должно быть установлено
                приложение вашего банка.
              </div>
              <div className="step">
                <strong>Если не получается:</strong> Откройте сайт с ПК →
                используйте QR-код для оплаты.
              </div>
            </div>
          </div>

          <div className="help-card">
            <div className="card-header">
              <span className="card-icon">📦</span>
              <h2>Покупка и вывод товара</h2>
            </div>
            <div className="card-content">
              <div className="step">
                <strong>Шаг 1:</strong> Купите товар → он появится в{" "}
                <span className="highlight">инвентаре на сайте</span>.
              </div>
              <div className="step">
                <strong>Шаг 2:</strong> Зайдите в{" "}
                <span className="highlight">«Инвентарь»</span> → нажмите{" "}
                <span className="highlight">«Вывести всё»</span>.
              </div>
              <div className="step">
                <strong>Шаг 3:</strong> Свяжитесь с{" "}
                <span className="highlight blue">администратором</span> для
                передачи товара.
              </div>
              <div className="step">
                <strong>Совет:</strong> Администратор добавит вас в друзья в
                игре и передаст товар через трейд.
              </div>
              <div className="step">
                <strong>Если долго нет ответа:</strong> Напишите в{" "}
                <span className="highlight blue">группу VK</span> или на почту.
              </div>
            </div>
          </div>
        </div>

        <div className="important-notes">
          <div className="notes-header">
            <span className="notes-icon">📌</span>
            <h2>Важные заметки</h2>
          </div>
          <div className="notes-content">
            <div className="note">
              <strong>Детские карты:</strong> Не работают СберKids, АльфаKids
              (но Tinkoff Junior — работает).
            </div>
            <div className="note">
              <strong>Задержки вывода:</strong> Администратор может отвечать до
              24 часов (пишите, если прошло больше).
            </div>
            <div className="note">
              <strong>Безопасность:</strong> Никому не сообщайте данные от
              аккаунта на сайте!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
