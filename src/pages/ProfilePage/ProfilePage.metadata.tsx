import { Helmet } from "react-helmet-async";

export const ProfilePageMetadata = () => {
  return (
    <>
      <Helmet>
        <title>LorryWorld | Профиль</title>
        <meta
          name="description"
          content="Откройте для себя широкий выбор эксклюзивных товаров! Улучшите свой игровой опыт с нашей премиальной коллекцией товаров по непревзойденным ценам. Приготовьтесь выделиться в виртуальном мире и выведите свой игровой процесс на новый уровень с помощью самых крутых товаров на рынке. Безопасно, быстро и удобно."
        />
        <link rel="canonical" href="https://example.com/" />
        <meta property="og:title" content="LorryWorld" />
        <meta
          property="og:description"
          content="Магазин цифорвых товаров LorryWorld"
        />
      </Helmet>
    </>
  );
};
