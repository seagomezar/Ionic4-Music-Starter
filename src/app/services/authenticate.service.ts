import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class AuthenticateService {
  constructor(private storage: Storage) {}

  loginUser(credentials) {
    const key = credentials.email;
    const encryptedPass = credentials.password;
    return new Promise((accept, reject) => {
      this.storage.get(key).then(usuario => {
        if (usuario) {
          if (usuario.password == btoa(encryptedPass)) {
            accept(usuario);
          } else {
            reject("Contraseña incorrecta");
          }
        } else {
          reject("No existe un usuario con este email");
        }
      });
    });
  }

  registerUser(value) {
    return new Promise((accept, reject) => {
      this.storage.get(value.email).then(usuario => {
        if (usuario) {
          console.log(usuario);
          reject("El usuario ya existe");
        } else {
          // Un poco 'Minimo' de seguridad
          value.password = btoa(value.password);
          this.storage.set(value.email, value).then(() => {
            accept("El usuario se ha creado con éxito");
          });
        }
      });
    });
  }
}
