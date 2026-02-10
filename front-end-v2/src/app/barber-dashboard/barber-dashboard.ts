import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { AppointmentService } from '../services/appointment.services';

type Appointment = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    service_type: string;
    barber_name: string;
    date_time: string; // "YYYY-MM-DD HH:MM"
    is_done: boolean;
};

@Component({
    selector: 'app-barber-panel',
    standalone: true,
    imports: [FormsModule, AsyncPipe, NgClass],
    templateUrl: './barber-dashboard.html',
    styleUrl: './barber-dashboard.css',
})
export class BarberPanelComponent {
    selectedDate = this.toISODate(new Date());

    loading = false;
    appointments: Appointment[] = [];

    constructor(
        private appointmentService: AppointmentService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.load();
    }

    load() {
        this.loading = true;

        this.appointmentService.getMyAppointments(this.selectedDate).pipe(
            finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            })
        ).subscribe({
            next: (list) => {
                this.appointments = [...(list ?? [])].sort((a, b) =>
                    a.date_time.localeCompare(b.date_time)
                );
            },
            error: (err) => {
                console.error(err);
                this.appointments = [];
                alert('Неуспешно зареждане. Провери дали си логнат като бръснар.');
            }
        });
    }

    onDateChange(dateISO: string) {
        this.selectedDate = dateISO;
        this.load();
    }

    // helper: показва само HH:MM
    getTime(dateTime: string) {
        const parts = dateTime.split(' ');
        return parts.length === 2 ? parts[1] : dateTime;
    }

    private toISODate(d: Date) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }
}
