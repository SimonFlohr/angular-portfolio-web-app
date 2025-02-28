import { Component } from '@angular/core';
import { GreekStatueComponent } from "../greek-statue/greek-statue.component";

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [GreekStatueComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {

}
