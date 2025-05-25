import { Component, AfterViewInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: true,
      freeMode: true,
      autoplay: {
        delay: 1,  // Set a delay for autoplay to take place (adjust as needed)
        disableOnInteraction: false,  // Continue autoplay even after user interaction
      },

      speed: 5000,
      simulateTouch: true,
      grabCursor: true,
      scrollbar: { hide: true },
      navigation: false,
      pagination: false,
    });
  }
  scrollToSection(event: Event, sectionclass: string) {
    event.preventDefault(); 
    const el = document.querySelector("." + sectionclass);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}