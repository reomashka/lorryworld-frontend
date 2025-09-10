import VintagesCover from "@assets/coversItem/MM/vintages.png";
import AncientsCover from "@assets/coversItem/MM/ancients.png";
import GodlyCover from "@assets/coversItem/MM/godly.png";
import ChromaCover from "@assets/coversItem/MM/chroma.png";
import CorruptCover from "@assets/coversItem/MM/corrupt.png";
import CommonCover from "@assets/coversItem/MM/common.png";
import LegendaryCover from "@assets/coversItem/MM/legendary.png";
import RareCover from "@assets/coversItem/MM/rare.png";
import UncommonCover from "@assets/coversItem/MM/uncommon.png";

import BlueCover from "@assets/coversItem/GAG/blue.png";
import GreenCover from "@assets/coversItem/GAG/green.png";
import YellowCover from "@assets/coversItem/GAG/yellow.png";
import RedCover from "@assets/coversItem/GAG/red.png";
import PurpleCover from "@assets/coversItem/GAG/purple.png";

import CommonCoverAM from "@assets/coversItem/AM/common.png";
import LegendaryCoverAM from "@assets/coversItem/AM/legendary.png";
import RareCoverAM from "@assets/coversItem/AM/rare.png";
import UltraRareCoverAM from "@assets/coversItem/AM/ultraRare.png";
import UncommonCoverAM from "@assets/coversItem/AM/uncommon.png";

const rarityItemMap = {
  MM: {
    Vintages: VintagesCover,
    Godly: GodlyCover,
    Chroma: ChromaCover,
    Ancients: AncientsCover,
    Corrupt: CorruptCover,
    Common: CommonCover,
    Legendary: LegendaryCover,
    Rare: RareCover,
    Uncommon: UncommonCover,
  },
  GAG: {
    Blue: BlueCover,
    Green: GreenCover,
    Yellow: YellowCover,
    Red: RedCover,
    Purple: PurpleCover,
  },
  AM: {
    Legendary: LegendaryCoverAM,
    UltraRare: UltraRareCoverAM,
    Rare: RareCoverAM,
    Uncommon: UncommonCoverAM,
    Common: CommonCoverAM,
  },
} as const;

export default rarityItemMap;
