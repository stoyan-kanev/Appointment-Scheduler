import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';

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
        '/1.jpg',
        '/2.jpg',
        '/3.jpg',
        '/1.jpg',
        '/2.jpg',
        '/3.jpg',
    ];
    currentSlide = 0;
    intervalId: any;

    ngOnInit() {
        this.intervalId = setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % this.images.length;
        }, 3000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }
}
