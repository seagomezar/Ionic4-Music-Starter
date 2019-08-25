import { Component } from "@angular/core";
import { PlatziMusicService } from "../services/platzi-music.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  newReleases: any[] = [];
  artists: any[] = [];
  favorites: any[] = [];
  constructor(private musicService: PlatziMusicService) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then(newReleases => {
      this.newReleases = this.artists = this.favorites =
        newReleases.albums.items;
    });
  }
}
