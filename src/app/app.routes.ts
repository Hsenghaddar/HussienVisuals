import { Routes,ExtraOptions  } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Rout404Component } from './rout404/rout404.component';
import { MainComponent } from './main/main.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
    {path:"Home",component:HomeComponent},
    {path:"main",component:MainComponent},
    {path:"gallery",component:GalleryComponent},
    {path:'',redirectTo:'/main',pathMatch:'full'},//default page
    {path:"rout404",component:Rout404Component},
    {path:"**",redirectTo:"rout404"}//404 route,if the user writes /page that is not found we direct him to this route
];
