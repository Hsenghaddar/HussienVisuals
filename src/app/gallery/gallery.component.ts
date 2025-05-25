import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import _ScrollTrigger from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollSmoother,_ScrollTrigger);
    const scrollableImages=document.querySelectorAll(".scrollableImages")
    let skewSetter = gsap.quickTo(scrollableImages, "skewY"), // fast
      clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

    ScrollSmoother.create({
      wrapper: "#wrapper",
      content: "#content",
      smooth: 2,
      speed: 1,
      effects: true,
      onUpdate: self => skewSetter(clamp(self.getVelocity() / -50)),
      onStop: () => skewSetter(0)
    });
  }

}
