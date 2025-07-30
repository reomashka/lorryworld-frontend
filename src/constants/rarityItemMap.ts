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
import GreenCover from "@assets/coversItem/green.png";
import YellowCover from "@assets/coversItem/yellow.png";
import RedCover from "@assets/coversItem/red.png";
import PurpleCover from "@assets/coversItem/purple.png";

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
  Green: GreenCover,
  Yellow: YellowCover,
  Red: RedCover,
  Purple: PurpleCover,
} as const;

export default rarityItemMap;
