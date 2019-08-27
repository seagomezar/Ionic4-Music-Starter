import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage {
  user: any;
  userImage: string = "assets/img/user.jpg";
  photo: SafeResourceUrl;
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer
  ) {}

  ionViewWillEnter() {
    this.storage.get("currentUser").then(value => {
      this.user = value;
    });
  }

  goHome() {
    this.navCtrl.navigateBack("/menu/tabs/home");
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }
}
