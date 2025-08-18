import { Helmet } from "react-helmet-async";

export const HelpPageMetadata = () => {
  return (
    <Helmet>
      <title>LorryWorld | Помощь</title>
      <meta
        name="description"
        content="Раздел помощи LorryWorld — инструкции, ответы на частые вопросы и поддержка пользователей."
      />
      <link rel="canonical" href="https://lorryworld.space/help" />

      <meta property="og:title" content="LorryWorld | Помощь" />
      <meta
        property="og:description"
        content="Раздел помощи LorryWorld — инструкции, ответы на частые вопросы и поддержка пользователей."
      />
      <meta property="og:url" content="https://lorryworld.space/help" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="LorryWorld | Помощь" />
      <meta
        name="twitter:description"
        content="Раздел помощи LorryWorld — инструкции, ответы на частые вопросы и поддержка пользователей."
      />

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
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Помощь",
              "item": "https://lorryworld.space/help"
            }
          ]
        }
        `}
      </script>
    </Helmet>
  );
};
