import { Component } from '@angular/core';
import {I18nService} from '../services/i18n.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
    constructor(public i18n: I18nService) {}
}
