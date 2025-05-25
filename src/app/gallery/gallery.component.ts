import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements AfterViewInit, OnInit {
  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'loading');
  }
  async ngAfterViewInit(): Promise<void> {
    if (typeof document !== 'undefined') {
      this.renderer.removeClass(document.body, 'loading');
      // Hide the loading container element
      const loadingCont = document.querySelector('.loading-cont') as HTMLElement;
      if (loadingCont) {
        loadingCont.style.display = 'none';
      }
      const gsapModule = await import('gsap');
      const ScrollSmoother = (await import('gsap/ScrollSmoother')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
      const scrollableImages = document.querySelectorAll(".scrollableImages")
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
}
