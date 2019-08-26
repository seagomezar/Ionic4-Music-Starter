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
  song: any = {};
  newTime: number = 0;
  pausedTime: number = 0;
  playing: boolean = false;
  constructor(private musicService: PlatziMusicService) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then(newReleases => {
      this.newReleases = this.artists = this.favorites =
        newReleases.albums.items;
    });
    this.song = new Audio(
      "https://p.scdn.co/mp3-preview/da32446269129ed4b4dd522169003c49ecd16bb4?cid=555776939cf64ea6b39915cf4d5d875d"
    );
  }
  play() {
    this.song.addEventListener("timeupdate", time => {
      this.newTime = (this.song.currentTime * (this.song.duration / 10)) / 100;
    });
    this.song.play();
    this.song.currentTime = this.pausedTime;
    this.playing = true;
  }
  pause() {
    this.song.pause();
    this.pausedTime = this.song.currentTime;
    this.playing = false;
  }
  reset() {
    this.song.pause();
    this.newTime = this.pausedTime = this.song.currentTime = 0;
    this.playing = false;
  }
  markAsFavourite() {
    this.song.favourite = true;
  }
  markAsNonFavourite() {
    this.song.favourite = false;
  }
  parseTime(time = "0.00") {
    const partTime = time.toString().split(".");
    return partTime[0] + ":" + partTime[1].slice(0, 2);
  }
}
