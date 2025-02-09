import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-nav',
    imports: [
        RouterLink,
        RouterLinkActive,
        NgClass,
    ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    isMenuOpen = false;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
}
