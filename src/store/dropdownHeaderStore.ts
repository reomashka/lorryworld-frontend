import { makeAutoObservable } from "mobx";

class DropdownHeaderStore {
  isOpen = false;
  game: "MM" | "AM" = "MM";
  hasSeenGameSelectionModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  select(value: "MM" | "AM") {
    this.game = value;
    this.isOpen = false;
  }

  markModalShown() {
    this.hasSeenGameSelectionModal = true;
  }
}

export const dropdownHeaderStore = new DropdownHeaderStore();
