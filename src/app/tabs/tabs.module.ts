import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: "../home/home.module#HomePageModule"
      },
      { path: "video", loadChildren: "../video/video.module#VideoPageModule" },
      {
        path: "search",
        loadChildren: "../search/search.module#SearchPageModule"
      },
      {
        path: "sports",
        loadChildren: "../sports/sports.module#SportsPageModule"
      },
      {
        path: "library",
        loadChildren: "../library/library.module#LibraryPageModule"
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
