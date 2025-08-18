import { Helmet } from "react-helmet-async";

export const InventoryPageMetadata = () => {
  return (
    <Helmet>
      <title>LorryWorld | Инвентарь</title>
      <meta
        name="description"
        content="Просматривайте и управляйте своим игровым инвентарем на LorryWorld. Все предметы и покупки в одном месте."
      />
      <link rel="canonical" href="https://lorryworld.space/inventory" />

      <meta property="og:title" content="LorryWorld | Инвентарь" />
      <meta
        property="og:description"
        content="Просматривайте и управляйте своим игровым инвентарем на LorryWorld."
      />
      <meta property="og:url" content="https://lorryworld.space/inventory" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="LorryWorld | Инвентарь" />
      <meta
        name="twitter:description"
        content="Просматривайте и управляйте своим игровым инвентарем на LorryWorld."
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
              "name": "Инвентарь",
              "item": "https://lorryworld.space/inventory"
            }
          ]
        }
        `}
      </script>
    </Helmet>
  );
};
