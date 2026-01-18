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
    glassMove(e: MouseEvent) {
        const el = e.currentTarget as HTMLElement;
        const r = el.getBoundingClientRect();

        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;

        el.style.setProperty('--mx', `${x}%`);
        el.style.setProperty('--my', `${y}%`);
    }

    glassLeave(e: MouseEvent) {
        const el = e.currentTarget as HTMLElement;
        el.style.removeProperty('--mx');
        el.style.removeProperty('--my');
    }
}
