import { Component } from "@angular/core";
import { MusicService } from "../services/music.service";
import { SongsModalPage } from "../songs-modal/songs-modal.page";
import { ModalController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  slideOpts = {
    initialSlide: 3,
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
  dataReturned: any;
  songName: any;
  currentSong: any = {};
  constructor(
    private musicService: MusicService,
    public modalController: ModalController,
    public loadingController: LoadingController
  ) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then(newReleases => {
      this.newReleases = this.favorites = newReleases.albums.items;
    });
    this.artists = this.musicService.getArtists();
  }
  play(song) {
    const previewUrl = song ? song.preview_url : this.currentSong.preview_url;
    this.song = new Audio(previewUrl);
    this.song.addEventListener("timeupdate", () => {
      this.newTime = (this.song.currentTime * (this.song.duration / 10)) / 100;
    });
    this.song.play();
    this.song.currentTime = this.pausedTime;
    this.playing = true;
  }
  pause() {
    if (this.song) {
      this.song.pause();
    }

    this.pausedTime = this.song.currentTime;
    this.playing = false;
  }
  reset() {
    if (this.playing) {
      this.song.pause();
    }
    this.newTime = this.pausedTime = this.song.currentTime = 0;
    this.playing = false;
  }
  markAsFavourite() {
    this.song.favourite = true;
    // Implement some backend logic here
  }
  markAsNonFavourite() {
    this.song.favourite = false;
    // Implement some backend logic here
  }
  parseTime(time = "0.00") {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);

      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }

  async showSongs(artist) {
    const loading = await this.loadingController.create({
      message: "Cargando las canciones del artista"
    });
    await loading.present();
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    });
    loading.dismiss();

    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        if (dataReturned) {
          //Play a la canción!
          this.newTime = 0;
          this.reset();
          this.currentSong = this.dataReturned;
          // delayIntencional
          setTimeout(() => {
            this.play(this.dataReturned);
          }, 200);
        }
      }
    });

    return await modal.present();
  }
}
