import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthenticateService {
  constructor() {}
  loginUser(credentials) {
    return new Promise((accept, reject) => {
      accept("Login Ok!");
    });
  }
  registerUser(value) {
    return new Promise<any>((accept, reject) => {
      accept();
    });
  }
}
