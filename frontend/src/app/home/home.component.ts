import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {I18nService} from '../services/i18n.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        RouterLink,
        CommonModule,
    ],
})
export class HomeComponent {
    images = [
        '/barber1.jpg',
        '/barber2.jpg',
        '/barber3.jpg',
        '/barber4.jpg',
        '/barber5.jpg',
        '/barber6.jpg',
        '/barber7.jpg',
        '/barber8.jpg',
        '/barber1.jpg',
        '/barber2.jpg',
        '/barber3.jpg',
        '/barber4.jpg',
        '/barber5.jpg',
        '/barber6.jpg',
        '/barber7.jpg',
        '/barber8.jpg',
    ];
    currentSlide = 0;
    intervalId: any;
    constructor(public i18n: I18nService) {}
    ngOnInit() {
        this.intervalId = setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % this.images.length;
        }, 3000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }
}
