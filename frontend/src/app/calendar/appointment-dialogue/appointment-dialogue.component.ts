import { Component, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-appointment-dialogue',
    standalone: true,
    templateUrl: './appointment-dialogue.component.html',
    imports: [
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        DatePipe
    ],
    styleUrls: ['./appointment-dialogue.component.css']
})
export class AppointmentDialogueComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public appointment: any) {}
}
