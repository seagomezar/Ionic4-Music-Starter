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
      title: "Mensajes",
      url: "/menu/mensajes",
      icon: "mail-open"
    },
    {
      title: "Notificaciones",
      url: "/menu/notificaciones",
      icon: "notifications"
    },
    {
      title: "Videos",
      url: "/menu/videos",
      icon: "videocam"
    },
    {
      title: "Lugares",
      url: "/menu/lugares",
      icon: "pin"
    },
    {
      title: "Configuraciones",
      url: "/menu/configuraciones",
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
    this.navCtrl.navigateRoot("login");
  }
}
