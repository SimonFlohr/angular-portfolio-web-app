import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './component/navbar/title/title.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-portfolio-web-app';
}
