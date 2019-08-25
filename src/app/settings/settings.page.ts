import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage {
  user: any;
  constructor(private storage: Storage, private navCtrl: NavController) {}

  ionViewWillEnter() {
    this.storage.get("currentUser").then(value => {
      this.user = value;
    });
  }

  goHome() {
    this.navCtrl.navigateBack("/menu/tabs/home");
  }
}
