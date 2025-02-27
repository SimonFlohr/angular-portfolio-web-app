import { Component, AfterViewInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent implements AfterViewInit {
  
  // store animation instances to control them
  private animations: { [key: string]: anime.AnimeInstance } = {};
  
  ngAfterViewInit() {
    this.disableNavItems();
    this.introAnimation();
    this.setupHoverAnimations();
  }

  disableNavItems() {
    // disable all interactions initially
    const github = document.getElementById('github');
    const linkedin = document.getElementById('linkedin');

    if (github && linkedin) {
      github.style.pointerEvents = 'none';
      linkedin.style.pointerEvents = 'none';
    }
  }

  introAnimation() {
    setTimeout(() => {
      const socialIcons = Array.from(document.querySelectorAll('#github, #linkedin'));
      
      // set initial state
      anime.set(socialIcons, { 
        opacity: 0,
        translateY: -4
      });
      
      // animate icons with stagger effect
      anime({
        targets: socialIcons,
        opacity: [0, 1],
        translateY: [-4, 0],
        duration: 2000,
        delay: 2300,
        easing: 'easeOutElastic(1, .8)',
        // enable pointer events when opacity reaches a reasonable threshold
        update: (anim) => {
          if (anim.progress > 52) {
            const github = document.getElementById('github');
            const linkedin = document.getElementById('linkedin');
            if (github && linkedin) {
              github.style.pointerEvents = 'auto';
              linkedin.style.pointerEvents = 'auto';
            }
          }
        }
      });
    }, 0);
  }

  setupHoverAnimations() {
    const socialIcons = document.querySelectorAll('#github, #linkedin');
    
    socialIcons.forEach(icon => {
      const id = icon.id;
      
      // add mouse enter event
      icon.addEventListener('mouseenter', () => {
        // stop any existing animation
        if (this.animations[id]) {
          this.animations[id].pause();
        }
        
        // create new animation
        this.animations[id] = anime({
          targets: icon,
          translateY: -5,
          duration: 400,
          easing: 'easeOutBack'
        });
      });
      
      // add mouse leave event
      icon.addEventListener('mouseleave', () => {
        // stop any existing animation
        // if (this.animations[id]) {
        //   this.animations[id].pause();
        // }
        
        // create new animation
        this.animations[id] = anime({
          targets: icon,
          translateY: 0,
          duration: 400,
          easing: 'easeOutQuad',
          complete: () => {
            // ensure the icon is back at its original position
            anime.set(icon, { translateY: 0 });
          }
        });
      });
    });
    
    // additional safety - reset on document clicks away from icons
    document.addEventListener('click', (event) => {
      const clickedIcon = (event.target as Element)?.closest('#github, #linkedin');
      if (!clickedIcon) {
        // ff click is outside icons, reset all icons
        socialIcons.forEach(icon => {
          anime.set(icon, { translateY: 0 });
        });
      }
    });
  }
}
