import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {NgClass, NgIf} from '@angular/common';
import {I18nService} from '../services/i18n.service';

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
    constructor(public i18n: I18nService) {}

    changeLang(lang: 'en' | 'bg') {
        this.i18n.setLang(lang);
    }
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

}
