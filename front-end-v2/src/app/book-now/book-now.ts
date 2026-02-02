import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-book-now',
  imports: [],
  templateUrl: './book-now.html',
  styleUrl: './book-now.css',
})
export class BookNowComponent {

    @Input() patternUrl = 'page.svg';
    selectedService = ''


    selectService(serviceName:string) {
        this.selectedService = serviceName;
    }

}
