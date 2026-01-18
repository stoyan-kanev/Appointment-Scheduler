import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {I18nService} from '../services/i18n.service';

@Component({
    selector: 'app-nav',
    imports: [
        RouterLink,
    ],
    templateUrl: './nav.html',
    styleUrl: './nav.css'
})
export class NavComponent {
    isMenuOpen = false;

    constructor(public i18n: I18nService) {
    }

    changeLang(lang: 'en' | 'bg') {
        this.i18n.setLang(lang);
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

}
