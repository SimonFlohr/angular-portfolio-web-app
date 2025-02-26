import { Component, OnInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent implements OnInit {
  ngOnInit(): void {
    this.animateTitle();
  }

  animateTitle(): void {
    const titleShape = document.getElementById('title-shape');
    const letterS = document.getElementById('title-first-name-s');
    const letterF = document.getElementById('title-last-name-f');
    
    if (titleShape && letterS && letterF) {
      // hide letters
      letterS.style.transform = 'translateX(-20px)';
      letterF.style.transform = 'translateX(-130px)';

      // create animation timeline
      const timeline = anime.timeline({
        easing: 'easeOutExpo'
      });

      // ***************
      // TIMELINE EVENTS
      // ***************
      timeline

      // shape emerges from the background
      .add({
        targets: '#title-shape',
        height: [0, 40],
        duration: 120,
        easing: 'easeInOutQuad'
      }, '+=500')

      // letter 'S' moves to the right
      .add({
        targets: '#title-first-name-s',
        translateX: ['0'],
        position: 'static',
        duration: 340,
        easing: 'easeOutElastic(1, .75)'
      }, '+=80')

      // letter 'F' moves to the right
      .add({
        targets: '#title-last-name-f',
        translateX: ['-98px'],
        position: 'static',
        duration: 340,
        easing: 'easeOutElastic(1, 1)'
      }, '-=310')

      // shape disappears in the background
      .add({
        targets: '#title-shape',
        height: '0',
        duration: 160,
        easing: 'easeInOutQuad'
      }, '-=60')

      // letter 'F' moves to its final position
      .add({
        targets: '#title-last-name-f',
        translateX: ['0'],
        duration: 340
      })

      // remaining letters fade in
      .add({
        targets: '.letter-remaining',
        opacity: [0, 1],
        duration: 120,
        delay: anime.stagger(50, {from: 'first', direction: 'normal'}),
        easing: 'easeInOutQuad'
      }, '-=80')

      // designation fades in
      .add({
        targets: '#title-designation',
        opacity: [0, 1],
        duration: 330,
        easing: 'easeInOutQuad'
      }, '+=10')

    }
  }
}
