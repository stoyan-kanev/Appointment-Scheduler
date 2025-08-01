import { Component } from '@angular/core';
import {I18nService} from '../services/i18n.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-team',
    imports: [
        NgForOf
    ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

    constructor(
        public i18n: I18nService
    ) {
    }
    barbers = [
        { name: 'Petar Petrov', image: '/barber1.jpg' },
        { name: 'Angel Nikolov', image: '/barber2.jpg' },
        { name: 'Georgi Stoyanov', image: '/barber3.jpg' },
        { name: 'Ivan Hristov', image: '/barber4.jpg' },
        { name: 'Martin Marinov', image: '/barber5.jpg' },
        { name: 'Kiril Dimitrov', image: '/barber6.jpg' }
    ];
}
