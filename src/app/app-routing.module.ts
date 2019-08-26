import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { IntroGuard } from "./guards/intro.guard";
import { LoginGuard } from "./guards/login.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "intro", loadChildren: "./intro/intro.module#IntroPageModule" },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginPageModule",
    canActivate: [IntroGuard]
  },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule"
  },
  {
    path: "menu",
    loadChildren: "./menu/menu.module#MenuPageModule",
    canActivate: [LoginGuard, IntroGuard]
  },
  { path: 'songs-modal', loadChildren: './songs-modal/songs-modal.module#SongsModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
