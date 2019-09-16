import { Component } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { Storage } from "@ionic/storage";
import { NavController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage {
  pages = [
    {
      title: "Configuraciones",
      url: "/menu/settings",
      icon: "settings"
    }
  ];
  selectedPath: string = "";
  constructor(
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private menu: MenuController
  ) {}
  closeMenu() {
    this.menu.close();
  }

  async logout() {
    await this.storage.set("isLogged", false);
    this.storage.remove("currentUser");
    this.navCtrl.navigateRoot("login");
  }
}
