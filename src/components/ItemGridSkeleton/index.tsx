import ContentLoader from "react-content-loader";

export const ItemGridSkeleton = () => (
  <ContentLoader
    speed={2}
    width={230}
    height={230}
    viewBox="0 0 165 170"
    backgroundColor="#1d2125"
    foregroundColor="#2a2e33"
  >
    <rect x="0" y="0" rx="5" ry="5" width="160" height="160" />
  </ContentLoader>
);
