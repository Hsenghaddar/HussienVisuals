import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { FooterComponent } from "./footer/footer.component";
import { ContactComponent } from "./contact/contact.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { MissionComponent } from "./mission/mission.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent, AboutComponent, FooterComponent, ContactComponent, PortfolioComponent, MissionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommernce';
}
