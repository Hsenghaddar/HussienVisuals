import { Component, HostListener, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    CommonModule
  ]
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private router: Router) { }
  sidebar: boolean = false
  scrollToSection(event: Event, sectionclass: string) {
    event.preventDefault();// Prevent page reload
    const doScroll = () => {

      if (typeof document !== 'undefined') {
        //define them here because if we are in gallery page these elements are not found
        const el = document.querySelector("." + sectionclass);
        const sidebar = document.querySelector(".sidebar")
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        if (sidebar?.classList.contains('open-sidebar')) {
          this.sidebar = false;
        }
      }
    }
    if (this.router.url === '/gallery') {
      this.router.navigate(['/main'])
      
      setTimeout(() => {
        window.location.reload();
      }, 50);
      setTimeout(doScroll, 1000);//to ensure DOM is rendered
    } else if(this.router.url === '/main'){
      doScroll();
    }
  }
  private lastScrollTop: number = 0;
  private scrollThreshold: number = 100;
  visible: boolean = true;
  hidden: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > this.scrollThreshold) {
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        this.visible = false;
        this.hidden = true;
      } else {
        // Scrolling up
        this.visible = true;
        this.hidden = false;
      }
    } else {
      // Less than threshold, ensure navbar is visible
      this.visible = true;
      this.hidden = false;
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scroll
  }

  openSidebar() {
    this.sidebar = true
  }
  closeSidebar() {
    this.sidebar = false
  }
}

