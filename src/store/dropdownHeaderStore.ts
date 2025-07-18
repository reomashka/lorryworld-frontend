import { makeAutoObservable } from "mobx";

class DropdownHeaderStore {
  isOpen = false;
  game: "MM" | "GG" = "MM";

  constructor() {
    makeAutoObservable(this);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  select(value: "MM" | "GG") {
    this.game = value;
    this.isOpen = false;
  }
}

export const dropdownHeaderStore = new DropdownHeaderStore();
