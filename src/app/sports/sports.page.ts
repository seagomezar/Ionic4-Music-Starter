import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { MusicService } from "../services/music.service";

const { Geolocation } = Plugins;

@Component({
  selector: "app-sports",
  templateUrl: "./sports.page.html",
  styleUrls: ["./sports.page.scss"]
})
export class SportsPage {
  currentCenter: any;
  coordinates: any[] = [];
  defaultZoom = 14;
  items: any;
  searchTerm: string = "";
  searching = false;
  audioSong: HTMLAudioElement;
  constructor(private musicService: MusicService) {}

  ionViewDidEnter() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  watchPosition() {
    Geolocation.watchPosition({}, position => {
      this.currentCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.coordinates.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }

  async setFilteredItems() {
    this.searching = true;
    if (this.searchTerm) {
      const response = await this.musicService.searchTracks(this.searchTerm);
      this.items = response.tracks.items.filter(e => e.preview_url);
    } else {
      this.items = [];
    }
    this.searching = false;
  }

  play(song) {
    console.log(song);
    if (this.audioSong) {
      this.audioSong.pause();
    }
    const currentSong = this.items.filter(e => e.playing);
    if (currentSong[0]) {
      currentSong[0].playing = false;
    }
    song.playing = true;
    this.audioSong = new Audio(song.preview_url);
    this.audioSong.play();
  }
  pause(song) {
    this.audioSong.pause();
    song.playing = false;
  }
}
