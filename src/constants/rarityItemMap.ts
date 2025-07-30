import GodlyCover from "@assets/coversItem/godly.png";
import AncientsCover from "@assets/coversItem/ancients.png";
import ChromaCover from "@assets/coversItem/chroma.png";
import CorruptCover from "@assets/coversItem/corrupt.png";
import VintagesCover from "@assets/coversItem/vintages.png";
import CommonCover from "@assets/coversItem/common.png";
import LegendaryCover from "@assets/coversItem/legendary.png";
import RareCover from "@assets/coversItem/rare.png";
import UncommonCover from "@assets/coversItem/uncommon.png";
import BlueCover from "@assets/coversItem/blue.png";

const rarityItemMap = {
  // MM2
  Vintages: VintagesCover,
  Godly: GodlyCover,
  Chroma: ChromaCover,
  Ancients: AncientsCover,
  Corrupt: CorruptCover,
  Common: CommonCover,
  Legendary: LegendaryCover,
  Rare: RareCover,
  Uncommon: UncommonCover,

  // GAG
  Blue: BlueCover,
} as const;

export default rarityItemMap;
