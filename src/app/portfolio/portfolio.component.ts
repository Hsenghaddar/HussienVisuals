import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      const cursor = document.querySelector(".custom-cursor") as HTMLElement
      const cardInner = document.querySelectorAll(".gallery-item__content")

      document.addEventListener('mousemove', (e) => {
        if (cursor) {
          cursor.style.top = `${e.clientY}px`;
          cursor.style.left = `${e.clientX}px`;
        }
      });

      cardInner.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          if (cursor) {
            cursor.style.opacity = "1"
          }

        })
      })
      cardInner.forEach((card) => {
        card.addEventListener("mouseleave", () => {
          if (cursor) {
            cursor.style.opacity = "0"
          }

        })
      })
    }
  }
  constructor(private router: Router) { }
  linkToGallery() {
    this.router.navigate(['/gallery'])
          setTimeout(() => {
        window.location.reload();
      }, 100);
  }

}
