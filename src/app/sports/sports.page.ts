import { Component } from "@angular/core";

@Component({
  selector: "app-sports",
  templateUrl: "./sports.page.html",
  styleUrls: ["./sports.page.scss"]
})
export class SportsPage {
  title = "My first AGM project";

  currentCenter = {
    lat: 4.656269,
    lng: -74.057307
  };
  coordinates: any[] = [
    { lat: 4.676802, lng: -74.048413 },
    { lat: 4.667925, lng: -74.054145 }
  ];
  constructor() {}

  ionViewDidEnter() {
    let index = 1;
    setInterval(() => {
      this.coordinates.push(this.generateNewCoords(this.coordinates[index]));
      index++;
      this.currentCenter = this.coordinates[index];
    }, 2000);
  }

  generateNewCoords(coords) {
    const metersLat = Math.random() * 100;
    const metersLng = Math.random() * 100;
    const earth = 6378.137, //radius of the earth in kilometer
      pi = Math.PI,
      m = 1 / (((2 * pi) / 360) * earth) / 1000; //1 meter in degree
    const newLatitude = coords.lat + metersLat * m;
    const newLongitude = coords.lng + metersLng * m;
    return { lat: newLatitude, lng: newLongitude };
  }
}
