import { AfterViewInit, Component } from '@angular/core';
import { GreekStatueComponent } from "../greek-statue/greek-statue.component";
import anime from 'animejs';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [GreekStatueComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent implements AfterViewInit {

  // store animation instances to control them
  private animations: { [key: string]: anime.AnimeInstance } = {};

  ngAfterViewInit() {
    this.disableNavItems();
    this.introAnimation();
    this.setupHoverAnimations();
  }

  disableNavItems() {
    // disable all interactions initially
    const mainContentDiv = document.getElementById('main-content-div');

    if (mainContentDiv) {
      mainContentDiv.style.pointerEvents = 'none';
    }
  }

  introAnimation() {
    const mainContentDiv = document.getElementById('main-content-div');
    
    // set initial state
    anime.set(mainContentDiv, {
      opacity: 0,
      translateY: -4
    })

    // add will-change property before animation starts
    if (mainContentDiv) {
      mainContentDiv.style.willChange = 'opacity, transform';
    }

    // animate main content div into view
    anime({
      targets: mainContentDiv,
      opacity: [0, 1],
      translateY: [-4, 0],
      duration: 2000,
      delay: 2300,
      easing: 'easeOutExpo',
      // enable pointer events when opacity reaches a reasonable threshold
      update: (anim) => {
        if (anim.progress > 55) {
          const mainContentDiv = document.getElementById('main-content-div');
          if (mainContentDiv) {
            mainContentDiv.style.pointerEvents = 'auto';
          }
        }
      },
      // remove will-change property after animation completes
      complete: () => {
        if (mainContentDiv) {
          mainContentDiv.style.willChange = 'auto';
        }
      }
    });
  }

  setupHoverAnimations() {
    const homeMainButtons = document.querySelectorAll('#more-about-me-button, #see-projects-button');
    
    homeMainButtons.forEach(button => {
      const id = button.id;

      // add mouse enter event
      button.addEventListener('mouseenter', () => {
        // stop any existing animation
        if (this.animations[id]) {
          this.animations[id].pause();
        }

        // create new animation
        this.animations[id] = anime({
          targets: button,
          translateY: -2,
          duration: 300,
          easing: 'easeOutExpo'
        });
      });

      // add mouse leave event
      button.addEventListener('mouseleave', () => {
        // create new animation
        this.animations[id] = anime({
          targets: button,
          translateY: 0,
          duration: 300,
          easing: 'easeOutExpo',
          complete: () => {
            // ensure the icon is back at its original position
            anime.set(button, { translateY: 0 });
          }
        });
      });
    });

    // additional safety - reset on document clicks away from icons
    document.addEventListener('click', (event) => {
      const clickedIcon = (event.target as Element)?.closest('#more-about-me-button, #see-projects-button');
      if (!clickedIcon) {
        // ff click is outside icons, reset all icons
        homeMainButtons.forEach(icon => {
          anime.set(icon, { translateY: 0 });
        });
      }
    });

  }

}
