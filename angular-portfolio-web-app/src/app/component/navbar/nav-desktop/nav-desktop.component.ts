import { CommonModule, NgFor, Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import anime, { timeline } from 'animejs';

@Component({
  selector: 'app-nav-desktop',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './nav-desktop.component.html',
  styleUrl: './nav-desktop.component.css'
})
export class NavDesktopComponent implements AfterViewInit {
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  
  menuItems = [
    { name: 'home', route: '/' },
    { name: 'about me', route: '/about' },
    { name: 'projects', route: '/projects' },
    { name: 'credentials', route: '/credentials' },
    { name: 'contact', route: '/contact' }
  ];

  constructor(public location: Location) {}

  ngAfterViewInit() {
    this.disableNavItems();
    this.introAnimation();
    this.setupAnimations();
  }

  disableNavItems() {
    // disable all nav items initially
    this.navItems.forEach(item => {
      const el = item.nativeElement;
      el.style.pointerEvents = 'none';
    });
  }

  introAnimation() {
    setTimeout(() => {
      const navLines = Array.from(document.querySelectorAll('.nav-line'));
      const navTexts = Array.from(document.querySelectorAll('.nav-text'));
      
      // set initial state
      anime.set(navLines, { opacity: 0, width: '24px' });
      anime.set(navTexts, { opacity: 0 });
      
      // animate all elements simultaneously after 600ms delay
      const animation = anime.timeline({
        easing: 'easeOutQuad'
      });
      
      animation.add({
        targets: [navLines, navTexts],
        opacity: [0, 1],
        translateY: [-4, 0],
        duration: 2000,
        easing: 'easeOutElastic(1, .8)',
        delay: 2000,
        update: (anim) => {
          // enable pointer events when opacity reaches a reasonable threshold
          if (anim.progress > 55 && this.navItems.first) {
            this.navItems.forEach(item => {
              const el = item.nativeElement;
              el.style.pointerEvents = 'auto';
            });
          }
        }
      });
    }, 0);
  }

  setupAnimations() {
    // get the CSS variables from the computed style
    const styles = getComputedStyle(document.documentElement);
    const neutralColor = styles.getPropertyValue('--color-light-mode-neutral');
    const primaryColor = styles.getPropertyValue('--color-light-mode-primary-brighter');
    
    this.navItems.forEach((item: ElementRef) => {
      const el = item.nativeElement;
      const line = el.querySelector('.nav-line');
      const text = el.querySelector('.nav-text');
      
      // skip animation setup for active links
      if (el.classList.contains('active')) {
        anime.set(line, {
          width: '75px',
          backgroundColor: primaryColor
        });
        
        anime.set(text, {
          color: primaryColor
        });
        return;
      }
      
      // initial state
      anime.set(line, {
        width: '24px'
      });

      // setup hover animations
      el.addEventListener('mouseenter', () => {
        anime({
          targets: line,
          width: '75px',
          backgroundColor: primaryColor,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        anime({
          targets: text,
          color: primaryColor,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });

      el.addEventListener('mouseleave', () => {
        // don't animate back if this is the active link
        if (el.classList.contains('active')) return;
        
        anime({
          targets: line,
          width: '24px',
          backgroundColor: neutralColor,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        anime({
          targets: text,
          color: neutralColor,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  }
}
