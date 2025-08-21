import { makeAutoObservable } from "mobx";

class DropdownHeaderStore {
  isOpen = false;
  game: "MM" | "GAG" = "MM";
  hasSeenGameSelectionModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  select(value: "MM" | "GAG") {
    this.game = value;
    this.isOpen = false;
  }

  markModalShown() {
    this.hasSeenGameSelectionModal = true;
  }
}

export const dropdownHeaderStore = new DropdownHeaderStore();
