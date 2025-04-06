import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppointmentService} from '../appointment.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'app-reservation-popup',
    standalone: true,
    templateUrl: './reservation-popup.component.html',
    styleUrl: './reservation-popup.component.css',
    imports: [ReactiveFormsModule, MatFormField, MatDialogTitle, MatInput, MatButton, MatIconButton, MatIcon]
})
export class ReservationPopupComponent {
    reservationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private appointmentService: AppointmentService,
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

            if (!this.data.date || !this.data.time) {
                console.error("Missing Date or Time!");
                return;
            }

            const formattedDateTime = this.formatDateTime(this.data.date, this.data.time);


            if (!formattedDateTime) {
                console.error("Formatted DateTime is Empty!");
                return;
            }

            const formData = {
                ...this.reservationForm.value,
                date_time: formattedDateTime
            };


            this.appointmentService.createAppointment(formData).subscribe({
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

    closeDialog() {
        this.dialogRef.close();
    }
    formatDateTime(date: string, time: string): string {
        if (!date || !time) {
            console.error("Invalid date or time:", date, time);
            return "";
        }

        const formattedDate = date;

        const formattedTime = time.split(" - ")[0];
        return `${formattedDate} ${formattedTime}`;
    }




}
