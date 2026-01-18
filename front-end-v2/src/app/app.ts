import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from './nav/nav';
import {FooterComponent} from './footer/footer';



@Component({
  selector: 'app-root',
  templateUrl: './app.html',
    imports: [
        RouterOutlet,
        NavComponent,
        FooterComponent,
    ],
  styleUrl: './app.css'
})
export class App {
}
