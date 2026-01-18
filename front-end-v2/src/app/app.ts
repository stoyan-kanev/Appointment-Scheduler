import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from './nav/nav';



@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    NavComponent,
  ],
  styleUrl: './app.css'
})
export class App {
}
