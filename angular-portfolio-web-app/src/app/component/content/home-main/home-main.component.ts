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

  ngAfterViewInit() {
    this.disableNavItems();
    this.introAnimation();
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
      easing: 'easeOutElastic(1, .8)',
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

}
