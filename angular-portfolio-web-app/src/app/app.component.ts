import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './component/navbar/title/title.component';
import { NavDesktopComponent } from "./component/navbar/nav-desktop/nav-desktop.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    NavDesktopComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-portfolio-web-app';
}
