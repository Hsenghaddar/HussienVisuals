import { AfterViewInit, Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { AboutComponent } from "../about/about.component";
import { PortfolioComponent } from "../portfolio/portfolio.component";
import { MissionComponent } from "../mission/mission.component";
import { ContactComponent } from "../contact/contact.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeComponent, AboutComponent, PortfolioComponent, MissionComponent, ContactComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    //observer
    const elements = document.querySelectorAll(".typeText");
    const skillSection = document.querySelector(".skills") as HTMLElement
    const counter = document.querySelector(".panel4-cont") as HTMLElement
    const counters = document.querySelectorAll(".count")
    const text = document.querySelectorAll(".text")
    const showOnScroll = document.querySelectorAll(".showOnScroll")
    const show = document.querySelectorAll(".show-on-scroll")
    let elementsInView:any[] = [];
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("skills")) {
            observer.unobserve(entry.target);
            animateNext();
          } else if (entry.target.classList.contains("panel4-cont")) {
            observer.unobserve(entry.target);
            count();
          } else if (entry.target.classList.contains("showOnScroll")) {
            Array.from(entry.target.children).forEach(child => {
              child.classList.add('appear');
            });
          } else if (entry.target.classList.contains("show-on-scroll")) {
            entry.target.classList.add("appear")
          }
        }
      })
    }, {
      threshold: 0.7
    });

    const observer2 = new IntersectionObserver((entries, observer2) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          0
          if (entry.target.classList.contains("text")) {
            observer.observe(entry.target);
            Array.from(entry.target.children).forEach(child => {
              child.classList.add('appear');
            });
          }
        } else {
          Array.from(entry.target.children).forEach(child => {
            child.classList.remove('appear');
          });
        }
      })
    }, {
      threshold: 0.5
    })
    show.forEach((el) => {
      observer.observe(el)
    })
    observer.observe(skillSection)
    observer.observe(counter)
    text.forEach((txt) => {
      observer2.observe(txt);
    })
    showOnScroll.forEach((el) => {
      observer.observe(el)
    })
    elements.forEach((el) => {
      elementsInView.push(el);
    })
    function animateNext() {
      if (elementsInView.length === 0) {
        return;
      }
      const el = elementsInView.shift();
      const text = el.dataset.text;
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
        } else {
          clearInterval(interval);
          el.nextElementSibling.nextElementSibling.classList.add("finish");
          setTimeout(() => {
            animateNext();
          }, 500); // short delay before next element
        }
      }, 40); // typing speed 
    }
    function count() {
      const duration = 3000;
      const frameRate = 30;
      counters.forEach((counter) => {
        const el=counter as HTMLElement;
        let current = 0;
        let target = parseInt(el.dataset['nb'] || '0')
        const increment = Math.ceil(target / (duration / frameRate));
        const interval = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(interval)
          }
          counter.textContent = `${current}`
        }, frameRate)
      })
    }

    //stacked scrolling
    let aat:any;
    const { ScrollObserver, valueAtPercentage } = aat
    const cardsContainer = document.querySelector('.cards')
    const cards = document.querySelectorAll('.card')

    Array.from(cards).forEach((card, index) => {
      const offsetTop = 20 + index * 20 + 2500
      const el=card as HTMLElement
      el.style.paddingTop = `${offsetTop}px`
      if (index === cards.length - 1) {
        return
      }
      const toScale = 1 - (cards.length - 1 - index) * 0.1
      const nextCard = cards[index + 1]
      const cardInner = card.querySelector('.card__inner') as HTMLElement
      ScrollObserver.Element(nextCard, {
        root: cardsContainer,
        offsetTop,
        offsetBottom: window.innerHeight - card.clientHeight
      }).onScroll(({ percentageY }: { percentageY: number }) => {
        cardInner.style.scale = valueAtPercentage({
          from: 1,
          to: toScale,
          percentage: percentageY
        })
        cardInner.style.filter = `brightness(${valueAtPercentage({
          from: 1,
          to: 0.6,
          percentage: percentageY
        })})`
      })
    })
  }

}
