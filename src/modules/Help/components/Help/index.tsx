import "./HelpPage.scss";

export const HelpModule = () => {
  return (
    <div className="help-page">
      <div className="help-container">
        <header className="help-header">
          <h1>Раздел в разработке</h1>
        </header>

        <div className="important-notes">
          <div className="notes-header">
            <span className="notes-icon">📌</span>
            <h2>Важные заметки</h2>
          </div>
          <div className="notes-content">
            <div className="note">
              <strong>А пока</strong> вы можете ознакомиться с инструкцией в
              нашем <a href="https://t.me/lorryworldmm2/9">телеграм канале</a>.
            </div>
            <div className="note">
              <strong>СВЯЗЬ С АДМИНОМ</strong> <br />
              Телеграм<a href="https://t.me/@gingermoor"> @gingermoor</a>
              <br />
              Почта{" "}
              <a href="mailto:lorryworldspace@gmail.com">
                lorryworldspace@gmail.com
              </a>
              <br />
              Вконтакте <a href="https://vk.com/lorryworldgg">lorryworldgg</a>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
