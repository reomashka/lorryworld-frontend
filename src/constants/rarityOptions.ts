type RarityOption = {
  id: string;
  name: string;
  colorClass: string;
};

export const rarityOptions: Record<string, RarityOption[]> = {
  MM: [
    { id: "chroma", name: "Chroma", colorClass: "color-chroma" },
    { id: "ancients", name: "Ancients", colorClass: "color-ancients" },
    { id: "godly", name: "Godly", colorClass: "color-godly" },
    { id: "vintages", name: "Vintages", colorClass: "color-vintages" },
    { id: "corrupt", name: "Corrupt", colorClass: "color-corrupt" },
    { id: "legendary", name: "Legendary", colorClass: "color-legendary" },
    { id: "uncommon", name: "Uncommon", colorClass: "color-uncommon" },
    { id: "rare", name: "Rare", colorClass: "color-rare" },
    { id: "common", name: "Common", colorClass: "color-common" },
  ],
  GAG: [
    { id: "blue", name: "Blue", colorClass: "color-blue" },
    { id: "yellow", name: "Yellow", colorClass: "color-yellow" },
    { id: "purple", name: "Purple", colorClass: "color-purple" },
    { id: "red", name: "Red", colorClass: "color-red" },
    { id: "green", name: "Green", colorClass: "color-green" },
  ],
};
