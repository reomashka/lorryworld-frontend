import { Helmet } from "react-helmet-async";

export const HomePageMetadata = () => {
  return (
    <Helmet>
      <title>LorryWorld | Главная</title>
      <meta
        name="description"
        content="Добро пожаловать в LorryWorld - магазин цифровых товаров для игр. Эксклюзивные предметы, безопасные покупки и удобный интерфейс."
      />
      <link rel="canonical" href="https://lorryworld.space/" />

      {/* Open Graph */}
      <meta property="og:title" content="LorryWorld | Главная" />
      <meta
        property="og:description"
        content="Добро пожаловать в LorryWorld — магазин цифровых товаров для игр."
      />
      <meta property="og:url" content="https://lorryworld.space/" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="LorryWorld | Главная" />
      <meta
        name="twitter:description"
        content="Добро пожаловать в LorryWorld — магазин цифровых товаров для игр."
      />

      {/* JSON-LD: Breadcrumb */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Главная",
              "item": "https://lorryworld.space/"
            }
          ]
        }
        `}
      </script>
    </Helmet>
  );
};
