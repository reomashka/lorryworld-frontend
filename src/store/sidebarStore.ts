import { makeAutoObservable } from "mobx";

class SidebarStore {
  isOpenSidebar = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar = () => {
    this.isOpenSidebar = !this.isOpenSidebar;
  };

  closeSidebar = () => {
    this.isOpenSidebar = false;
  };

  openSidebar = () => {
    this.isOpenSidebar = true;
  };
}

export const sidebarStore = new SidebarStore();
