import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticateService } from "../services/authenticate.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  validations_form: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";

  validation_messages = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "Ingresa un email válido." }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria." },
      {
        type: "minlength",
        message: "La contraseña debe tener al menos 5 caracteres."
      }
    ],
    lastname: [
      { type: "required", message: "El apellido es requerido." },
      {
        type: "minlength",
        message: "El apellido debe tener mínimo tres letras."
      }
    ],
    firstname: [
      { type: "required", message: "El nombre es requerido." },
      {
        type: "minlength",
        message: "El nombre debe tener mínimo tres letras."
      }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
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
      ),
      firstname: new FormControl(
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
      lastname: new FormControl(
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      )
    });
  }

  tryRegister(value) {
    this.authService
      .registerUser(value)
      .then(a => {
        console.log(a);
        this.errorMessage = "";
        this.successMessage = "Tu cuenta se ha creado con éxito.";
        setTimeout(() => {
          this.navCtrl.navigateForward("/login");
        }, 1000);
      })
      .catch(error => {
        this.errorMessage = error;
        this.successMessage = "";
      });
  }

  goToLoginPage() {
    this.navCtrl.navigateBack("/login");
  }
}
