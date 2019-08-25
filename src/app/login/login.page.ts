import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AuthenticateService } from "../services/authenticate.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  validations_form: FormGroup;
  errorMessage: string = "";

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  validation_messages = {
    email: [
      { type: "required", message: "El email es requerido." },
      { type: "pattern", message: "Por favor ingrese un email válido" }
    ],
    password: [
      { type: "required", message: "El password es requerido." },
      {
        type: "minlength",
        message: "El password debe tener al menos 5 caracteres"
      }
    ]
  };

  loginUser(value) {
    this.authService
      .loginUser(value)
      .then(user => {
        if (user) {
          this.errorMessage = "";
          this.storage.set("isLogged", true);
          this.storage.set("currentUser", user);
          this.navCtrl.navigateForward("/menu/tabs/home");
        } else {
          this.errorMessage = "Usuario no existe";
        }
      })
      .catch(error => {
        this.errorMessage = error;
      });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward("/register");
  }
}
