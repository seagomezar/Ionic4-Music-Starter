import { Component } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-songs-modal",
  templateUrl: "./songs-modal.page.html",
  styleUrls: ["./songs-modal.page.scss"]
})
export class SongsModalPage {
  songs: any[];
  artist: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ionViewDidEnter() {
    console.table(this.navParams);
    this.songs = this.navParams.data.songs;
    this.artist = this.navParams.data.artist;
  }

  async selectSong(song) {
    await this.modalController.dismiss(song);
  }
}
