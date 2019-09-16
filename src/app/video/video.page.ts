import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-video",
  templateUrl: "./video.page.html",
  styleUrls: ["./video.page.scss"]
})
export class VideoPage {
  videourl: string;
  constructor(public sanitizer: DomSanitizer) {
    this.videourl = "https://www.youtube.com/embed/UAlRf9qf9d0"; // The phantom agony!!!
  }
  dismiss() {
    //Implement you logic to dismiss here
  }
}
