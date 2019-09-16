import { Component } from "@angular/core";
import { MusicService } from "../services/music.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage {
  items: any;
  searchTerm: string = "";
  searching = false;
  audioSong: HTMLAudioElement;
  constructor(private musicService: MusicService) {}
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
