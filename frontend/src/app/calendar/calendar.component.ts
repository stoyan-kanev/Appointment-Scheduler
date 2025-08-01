import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {AppointmentService} from './appointment.service';
import {AuthService} from '../auth/services/auth.service';
import {AppointmentDialogueComponent} from './appointment-dialogue/appointment-dialogue.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormField,
        MatFormField,
        MatInput,
        MatFormField,
        FormsModule,
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css'
})
export class CalendarComponent {
    reservationForm!: FormGroup;
    currentDate: Date = new Date();
    selectedDay: string | null = null;
    dayNames: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    daysInMonth: any[] = [];
    reservedSlots: string[] = [];
    showSlots = true;
    isBarber = false;
    selectedSlot: string | null = null;
    showForm = false;
    error = ''
    selectedBarber: string = '';
    barbers: string[] = ['Petur Petrov', 'Angel Nikolov'];

    selectedService: string = ''
    services = [
        "Male Haircut",
        "Beard Shaping",
        "Combo",
        "Father and Son",
        "Beard + Dyeing",
        "Hair Camouflage",
        "Head Shave",
        "Head Shave + Beard",
        "Clipper Haircut (One Guard)",
    ]

    constructor(
        private dialog: MatDialog,
        private appointmentService: AppointmentService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.authService.getAuthStatus().subscribe(status => {
            this.isBarber = status;
        });
        this.generateMonth();

    }

    ngOnInit() {
        this.reservationForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9]{10,15}')]]
        });
    }

    changeMonth(offset: number) {
        this.currentDate = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() + offset,
            1
        );
        this.generateMonth();
        this.selectedDay = null;
    }

    selectBarber(barberName: string) {
        this.selectedBarber = barberName;
        this.selectedDay = null;
        this.reservedSlots = [];
        this.showSlots = false;
        this.error = '';
    }

    selectService(service: string) {
        this.selectedService = service;
        this.error = '';
    }

    generateMonth() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        this.daysInMonth = [];

        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
        for (let i = 0; i < adjustedFirstDay; i++) {
            this.daysInMonth.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            this.daysInMonth.push({
                date: new Date(year, month, day),
                slots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
            });
        }
    }

    isToday(date: Date | null | undefined): boolean {
        if (!date) return false;
        const today = new Date();
        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    }

    selectDay(day: any) {
        if (!this.selectedBarber) {
            this.error = 'Моля, изберете барбър първо.';
            return;
        }

        if (!day || !day.date) return;

        const selected = new Date(day.date);
        const today = new Date();
        const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.error = '';

        if (selected < normalizedToday) {
            this.error = 'Не можете да избирате минали дати.';
            return;
        }

        const year = selected.getFullYear();
        const month = String(selected.getMonth() + 1).padStart(2, '0');
        const date = String(selected.getDate()).padStart(2, '0');
        this.selectedDay = `${year}-${month}-${date}`;
        this.showSlots = true;

        this.appointmentService.getReservedSlots(this.selectedDay, this.selectedBarber).subscribe({
            next: (res) => {
                this.reservedSlots = res.reserved_slots;
            },
            error: (err) => {
                console.error('Error fetching reserved slots:', err);
            }
        });
    }

    getSelectedDaySlots(): string[] {
        if (!this.selectedDay) return [];

        const selectedDate = new Date(this.selectedDay);
        const isToday = this.isToday(selectedDate);
        const now = new Date();

        const selectedDayObj = this.daysInMonth.find(day => {
            return day?.date &&
                day.date.getFullYear() === selectedDate.getFullYear() &&
                day.date.getMonth() === selectedDate.getMonth() &&
                day.date.getDate() === selectedDate.getDate();
        });

        if (!selectedDayObj) return [];

        if (isToday) {
            return selectedDayObj.slots.filter((slot: string) => {
                const [h, m] = slot.split(':').map(Number);
                const slotTime = new Date(selectedDate);
                slotTime.setHours(h, m, 0, 0);
                return slotTime > now;
            });
        }

        return selectedDayObj.slots;
    }

    isSlotReserved(time: string): boolean {
        return this.reservedSlots.includes(time);
    }


    openReservationPopup(time: string) {
        if (!this.selectedDay) return;

        const [h, m] = time.split(':').map(Number);
        const datetime = new Date(this.selectedDay);
        datetime.setHours(h, m, 0, 0);
        this.error = ''
        if (datetime < new Date()) {
            this.error = 'Cannot book time in the past.'
            return;
        }

        this.selectedSlot = time;
        this.showForm = true;
        this.reservationForm.reset();
    }

    submitForm() {
        if (this.reservationForm.invalid || !this.selectedDay || !this.selectedSlot) return;

        if(!this.selectedService) {
            this.error = 'Select Service Before Submitting';
        }

        const date_time = `${this.selectedDay} ${this.selectedSlot.split(' - ')[0]}`;
        const payload = {
            ...this.reservationForm.value,
            date_time,
            barber_name: this.selectedBarber,
            service_type: this.selectedService,
        };

        this.appointmentService.createAppointment(payload).subscribe({
            next: () => {
                this.showForm = false;
                this.selectedSlot = null;
                this.appointmentService.getReservedSlots(this.selectedDay!, this.selectedBarber).subscribe({
                    next: (res) => {
                        this.reservedSlots = res.reserved_slots
                        window.location.reload();
                    },
                    error: (err) => console.error(err)
                });
            },
            error: (err) => {
                console.error('❌ Error:', err);
            }
        });
    }

    closeInlineForm() {
        this.showForm = false;
        this.selectedSlot = null;
    }

    onReservationSuccess() {
        this.closeInlineForm();
        if (this.selectedDay) {
            this.appointmentService.getReservedSlots(this.selectedDay, this.selectedBarber).subscribe({
                next: (res) => this.reservedSlots = res.reserved_slots,
                error: (err) => console.error('Error updating slots:', err)
            });
        }
    }

    viewAppointmentDetails(time: string) {
        this.appointmentService.getAppointmentDetails(this.selectedDay, time).subscribe({
            next: (appointment) => {
                this.dialog.open(AppointmentDialogueComponent, {
                    width: '400px',
                    data: appointment
                });
            },
            error: (err) => console.error('❌ Failed to fetch appointment details:', err)
        });
    }
}
