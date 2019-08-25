import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PlatziMusicService {
  constructor() {}

  getNewReleases() {
    return fetch("https://platzi-music-api.now.sh/browse/new-releases").then(
      response => response.json()
    );
  }
}
