import { Helmet } from "react-helmet-async";

export const ProfilePageMetadata = () => {
  return (
    <Helmet>
      <title>LorryWorld | Профиль</title>
      <meta
        name="description"
        content="Управляйте своим профилем, покупками и инвентарем на LorryWorld. Все инструменты для безопасного и удобного игрового опыта."
      />
      <link rel="canonical" href="https://lorryworld.space/profile" />

      {/* Open Graph */}
      <meta property="og:title" content="LorryWorld | Профиль" />
      <meta
        property="og:description"
        content="Управляйте своим профилем, покупками и инвентарем на LorryWorld."
      />
      <meta property="og:url" content="https://lorryworld.space/profile" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="LorryWorld | Профиль" />
      <meta
        name="twitter:description"
        content="Управляйте своим профилем, покупками и инвентарем на LorryWorld."
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
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Профиль",
              "item": "https://lorryworld.space/profile"
            }
          ]
        }
        `}
      </script>

      {/* JSON-LD: Person */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Имя пользователя",
          "url": "https://lorryworld.space/profile",
          "image": "https://lorryworld.space/images/avatar.jpg",
          "description": "Игрок в LorryWorld, владелец эксклюзивного инвентаря"
        }
        `}
      </script>
    </Helmet>
  );
};
