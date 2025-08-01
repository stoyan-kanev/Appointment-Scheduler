import {Component} from '@angular/core';
import {I18nService} from '../services/i18n.service';
import {NgForOf} from '@angular/common';

@Component({
    selector: 'app-appointment-services',
    imports: [
        NgForOf
    ],
    templateUrl: './appointment-services.component.html',
    styleUrl: './appointment-services.component.css'
})
export class AppointmentServicesComponent {

    constructor(
        public i18n: I18nService
    ) {
    }

    services = [
        {key: 'maleHaircut', price: 30, descriptionKey: 'desc_maleHaircut'},
        {key: 'beardShaping', price: 20, descriptionKey: 'desc_beardShaping'},
        {key: 'combo', price: 45, descriptionKey: 'desc_combo'},
        {key: 'fatherAndSon', price: 50, descriptionKey: 'desc_fatherAndSon'},
        {key: 'beardDyeing', price: 25, descriptionKey: 'desc_beardDyeing'},
        {key: 'hairCamouflage', price: '30-60', descriptionKey: 'desc_hairCamouflage'},
        {key: 'headShave', price: 30, descriptionKey: 'desc_headShave'},
        {key: 'headShaveBeard', price: 45, descriptionKey: 'desc_headShaveBeard'},
        {key: 'clipperHaircut', price: 20, descriptionKey: 'desc_clipperHaircut'}
    ];
}
