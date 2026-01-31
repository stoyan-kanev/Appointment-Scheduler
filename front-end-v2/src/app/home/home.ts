import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
    imports: [
        NgForOf,
        NgOptimizedImage
    ],
  templateUrl: './home.html',
  styleUrl: './home.css',
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
    constructor() {}
    ngOnInit() {
        this.intervalId = setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % this.images.length;
        }, 3000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }
}
