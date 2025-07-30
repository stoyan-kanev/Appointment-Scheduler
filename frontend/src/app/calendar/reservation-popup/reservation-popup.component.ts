import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-reservation-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './reservation-form.component.html',
    styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
    @Input() date!: string;
    @Input() time!: string;
    @Output() formClosed = new EventEmitter<void>();
    @Output() formSuccess = new EventEmitter<void>();

    reservationForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private appointmentService: AppointmentService
    ) {}

    ngOnInit() {
        this.reservationForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9]{10,15}')]]
        });
    }

    submitForm() {
        if (this.reservationForm.invalid) return;

        const date_time = `${this.date} ${this.time.split(' - ')[0]}`;

        const payload = {
            ...this.reservationForm.value,
            date_time
        };

        this.appointmentService.createAppointment(payload).subscribe({
            next: () => this.formSuccess.emit(),
            error: (err) => console.error('Error:', err)
        });
    }

    cancel() {
        this.formClosed.emit();
    }
}
