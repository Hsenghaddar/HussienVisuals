import { Component, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {

  async ngAfterViewInit(): Promise<void> {
    if (typeof document !== 'undefined') {
      const hoverLine = document.getElementById('hover-line') as HTMLElement;
      const events = document.querySelectorAll('.event');

      events.forEach((event: any) => {
        event.addEventListener('mouseenter', () => {
          const left = event.offsetLeft + event.offsetWidth / 2;
          hoverLine.style.width = `${left}px`;
        });

        event.addEventListener('mouseleave', () => {
          hoverLine.style.width = `0px`;
        });
      });
    }




    const gsapModule = await import('gsap');
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
    const gsap = gsapModule.default;

    gsap.registerPlugin(ScrollTrigger);
    if (typeof document !== 'undefined') {
      // Horizontal Scroll #1
      const wrapper1 = document.querySelector('#horizontal1 .horizontal-wrapper');
      if (wrapper1) {
        gsap.fromTo(wrapper1,
          { xPercent: 0 },
          {
            xPercent: -33.5,
            ease: 'none',
            scrollTrigger: {
              trigger: '#horizontal1',
              start: 'center center',
              end: () => '+=1000  ',
              scrub: true,
              pin: true,
              anticipatePin: 1,
            }
          }
        );
      }

      // Horizontal Scroll #2
      const wrapper2 = document.querySelector('#horizontal2 .horizontal-wrapper');
      if (wrapper2) {
        gsap.fromTo(wrapper2, { xPercent: 25.3 }, {
          xPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: '#horizontal2',
            start: 'center center',
            end: () => '+=1000',
            scrub: true,
            pin: true,
            anticipatePin: 1,
          }
        });
      }
    }



  }
}
