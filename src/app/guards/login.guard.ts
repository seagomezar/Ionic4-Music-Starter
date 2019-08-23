import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}
  async canActivate(): Promise<boolean> {
    const isLogged = await this.storage.get("isLogged");

    if (!isLogged) {
      this.router.navigateByUrl("/login");
    }
    return isLogged;
  }
}
