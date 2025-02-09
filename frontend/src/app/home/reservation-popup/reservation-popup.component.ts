import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ReservationService} from '../appointment.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-reservation-popup',
    standalone: true,
    templateUrl: './reservation-popup.component.html',
    styleUrl: './reservation-popup.component.css',
    imports: [ReactiveFormsModule, MatFormField, MatDialogTitle, MatInput, MatButton]
})
export class ReservationPopupComponent {
    reservationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private reservationService: ReservationService,
        public dialogRef: MatDialogRef<ReservationPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { date: string; time: string }
    ) {
        this.reservationForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9]{10,15}')]]
        });
    }

    submitForm() {
        if (this.reservationForm.valid) {
            const formattedDateTime = this.formatDateTime(this.data.date, this.data.time);

            console.log("Formatted DateTime Before Sending:", formattedDateTime);
            if (!formattedDateTime) {
                console.error("Failed to format date correctly!");
                return;
            }

            const formData = {
                ...this.reservationForm.value,
                date_time: formattedDateTime
            };

            console.log("Final Payload Sent to API:", formData);

            this.reservationService.createAppointment(formData).subscribe({
                next: (response) => {
                    console.log('Appointment Created:', response);
                    this.dialogRef.close();
                },
                error: (error) => {
                    console.error('Error creating appointment:', error);
                }
            });
        }
    }

    formatDateTime(date: string, time: string): string {
        if (!date || !time) {
            console.error("Invalid date or time:", date, time);
            return "";
        }


        const dateParts = date.split('-');
        if (dateParts.length !== 3) {
            console.error("Invalid date format:", date);
            return "";
        }

        const [year, month, day] = dateParts;
        return `${day}.${month}.${year} ${time.split(" - ")[0]}`;
    }


}
