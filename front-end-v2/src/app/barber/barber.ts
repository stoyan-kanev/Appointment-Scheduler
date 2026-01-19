import {Component, OnInit} from '@angular/core';
import {Barber, BarberService} from '../services/barber.services';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
    selector: 'app-barber',
    imports: [
        AsyncPipe
    ],
    standalone: true,

    templateUrl: './barber.html',
    styleUrl: './barber.css',
})

export class BarberComponent {
    barbers$: Observable<Barber[]>;
    flippedId: string | null = null;

    constructor(private barberService: BarberService) {
        this.barbers$ = this.barberService.getBarbers();
    }

    toggleFlip(id:string) {
        this.flippedId = this.flippedId === id ? null : id;
    }

}
