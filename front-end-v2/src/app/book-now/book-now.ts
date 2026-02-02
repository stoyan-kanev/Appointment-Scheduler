import {Component, Input} from '@angular/core';
import {Barber, BarberService, ListBarber} from '../services/barber.services';
import {Observable, shareReplay} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RoleLabelPipe} from '../pipe/role-label.pipe';

@Component({
    selector: 'app-book-now',
    imports: [
        AsyncPipe,
        RoleLabelPipe
    ],
    templateUrl: './book-now.html',
    styleUrl: './book-now.css',
})
export class BookNowComponent {

    @Input() patternUrl = 'page.svg';
    selectedService = ''
    selectedBarber: ListBarber | undefined

    barbers$: Observable<ListBarber[]>;
    trackBarber = (index: number, barber: ListBarber) => barber?.id ?? index;

    constructor(private barberService: BarberService) {
        this.barbers$ = this.barberService.listBarbers().pipe(
            shareReplay(1)
        );
    }




    selectService(serviceName: string) {
        this.selectedService = serviceName;
    }
    selectBarber(barber: ListBarber) {
        this.selectedBarber = barber;
    }


}
