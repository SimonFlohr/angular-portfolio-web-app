import { AfterViewInit, Component } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-greek-statue',
  standalone: true,
  imports: [],
  templateUrl: './greek-statue.component.html',
  styleUrl: './greek-statue.component.css'
})
export class GreekStatueComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.animateComposition();
  }

  animateComposition(): void {
    const circle = document.getElementById('circle');
    const clouds = ['cloud-one', 'cloud-two', 'cloud-three'].map(id => document.getElementById(id));

    if (circle) {
      circle.style.transform = 'scale(0.3)';
      circle.style.translate = '0 210px';

      anime({
        targets: '#circle',
        scale: [0.3, 1],
        translateY: [-200],
        duration: 4000,
        easing: 'easeInOutExpo',
        delay: 500
      });
    }

    clouds.forEach((cloud, index) => {
      if (cloud) {
        // Set initial position
        anime.set(cloud, {
          translateX: 0
        });
        
        // create continuous cloud animation
        anime({
          targets: cloud,
          translateX: [-30, 30],
          duration: 3000,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine',
          delay: index * 800,
          endDelay: 0
        });
      }
    });
  }
}
