import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppointmentService } from './appointment.service';
import { AuthService } from '../auth/services/auth.service';
import { ReservationPopupComponent } from './reservation-popup/reservation-popup.component';
import { AppointmentDialogueComponent } from './appointment-dialogue/appointment-dialogue.component';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css'
})
export class CalendarComponent {
    currentDate: Date = new Date();
    selectedDay: string | null = null;
    dayNames: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    daysInMonth: any[] = [];
    reservedSlots: string[] = [];
    showSlots = true;
    isBarber = false;

    constructor(
        private dialog: MatDialog,
        private appointmentService: AppointmentService,
        private authService: AuthService
    ) {
        this.authService.getAuthStatus().subscribe(status => {
            this.isBarber = status;
        });
        this.generateMonth();
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
                slots: ['15:00', '15:30', '16:00', '16:30', '17:00']
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
        if (!day || !day.date) return;

        const selected = new Date(day.date);
        const today = new Date();
        const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (selected < normalizedToday) {
            console.warn('❌ Cannot select a past date.');
            return;
        }

        const year = selected.getFullYear();
        const month = String(selected.getMonth() + 1).padStart(2, '0');
        const date = String(selected.getDate()).padStart(2, '0');
        this.selectedDay = `${year}-${month}-${date}`;
        this.showSlots = true;

        this.appointmentService.getReservedSlots(this.selectedDay).subscribe({
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

        if (datetime < new Date()) {
            console.warn('⛔ Cannot book time in the past.');
            return;
        }

        const dialogRef = this.dialog.open(ReservationPopupComponent, {
            width: '700px',
            data: { date: this.selectedDay, time }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'reserved') {
                this.appointmentService.getReservedSlots(this.selectedDay!).subscribe({
                    next: (res) => this.reservedSlots = res.reserved_slots,
                    error: (err) => console.error('Refresh error:', err)
                });
            }
        });
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
