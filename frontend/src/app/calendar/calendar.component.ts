import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ReservationPopupComponent} from './reservation-popup/reservation-popup.component';
import {AppointmentService} from './appointment.service';
import {AuthService} from '../auth/services/auth.service';
import {AppointmentDialogueComponent} from './appointment-dialogue/appointment-dialogue.component';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css'
})
export class CalendarComponent {
    currentDate: Date = new Date();
    selectedDay: string | null = null;
    daysInMonth: any[] = [];
    dayNames: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    reservedSlots: string[] = [];
    isBarber = false;
    showSlots = true;


    constructor(private dialog: MatDialog, private appointmentService: AppointmentService, private authService: AuthService) {
        this.authService.getAuthStatus().subscribe(isAuthenticated => {
            this.isBarber = isAuthenticated;
        });
        this.generateMonth();
    }

    generateMonth() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        this.daysInMonth = [];

        let adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < adjustedFirstDay; i++) {
            this.daysInMonth.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            this.daysInMonth.push({
                date: new Date(year, month, day),
                slots: [
                    {time: '15:00'},
                    {time: '15:30'},
                    {time: '16:00'},
                    {time: '16:30'},
                    {time: '17:00'}
                ]
            });
        }
    }

    canGoToPreviousMonth(): boolean {
        const now = new Date();
        return (
            this.currentDate.getFullYear() > now.getFullYear() ||
            (this.currentDate.getFullYear() === now.getFullYear() &&
                this.currentDate.getMonth() > now.getMonth())
        );
    }

    canGoToNextMonth(): boolean {
        const now = new Date();
        const maxDate = new Date(now.getFullYear(), now.getMonth() + 12, 1);
        return this.currentDate < maxDate;
    }

    changeMonth(offset: number) {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1);
        this.generateMonth();
        this.selectedDay = null;
    }

    getSelectedDaySlots() {
        if (!this.selectedDay) return [];

        const selectedDate = new Date(this.selectedDay);
        const now = new Date();

        const isToday = selectedDate.toDateString() === now.toDateString();

        const day = this.daysInMonth.find(d => {
            if (!d) return false;
            const localDate = new Date(d.date.getFullYear(), d.date.getMonth(), d.date.getDate());
            return localDate.toDateString() === selectedDate.toDateString();
        });

        if (!day) return [];

        if (isToday) {
            return day.slots.filter((slot: { time: string }) => {
                const [hours, minutes] = slot.time.split(':').map(Number);
                const slotTime = new Date(selectedDate);
                slotTime.setHours(hours, minutes, 0, 0);
                return slotTime > now;
            });
        }

        return day.slots;
    }

    hideSlots(): void {
        this.showSlots = false;
    }

    selectDay(day: any) {
        if (day) {
            const today = new Date();
            const selectedDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
            this.showSlots = true
            if (selectedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                console.warn("❌ Cannot select a past date.");
                return;
            }

            const year = day.date.getFullYear();
            const month = String(day.date.getMonth() + 1).padStart(2, '0');
            const date = String(day.date.getDate()).padStart(2, '0');

            this.selectedDay = `${year}-${month}-${date}`;

            this.appointmentService.getReservedSlots(this.selectedDay)
                .subscribe(response => {
                    this.reservedSlots = response.reserved_slots;
                }, error => {
                    console.error("Error fetching reserved slots:", error);
                });
        }
    }

    isPastDay(day: any): boolean {
        if (!day || !day.date) return true;

        const today = new Date();
        const target = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
        const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        return target < now;
    }

    isSlotReserved(time: string): boolean {
        return this.reservedSlots.includes(time);
    }

    openReservationPopup(time: string) {
        if (!this.selectedDay) {
            console.error("No date selected!");
            return;
        }

        const [hours, minutes] = time.split(':').map(Number);
        const selectedDateTime = new Date(this.selectedDay);
        selectedDateTime.setHours(hours, minutes, 0, 0);

        const now = new Date();

        if (selectedDateTime < now) {
            console.warn("⛔ Cannot reserve a time slot in the past.");
            return;
        }

        const dialogRef = this.dialog.open(ReservationPopupComponent, {
            width: '800px',
            data: {date: this.selectedDay, time}
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'reserved') {
                console.log("🔁 Refreshing reserved slots after reservation...");
                this.appointmentService.getReservedSlots(this.selectedDay)
                    .subscribe(response => {
                        this.reservedSlots = response.reserved_slots;
                    }, error => {
                        console.error("Error refreshing reserved slots:", error);
                    });
            }
        });
    }


    viewAppointmentDetails(time: string) {
        this.appointmentService.getAppointmentDetails(this.selectedDay, time).subscribe({
            next: (appointment) => {
                // console.log("✅ Appointment Details Fetched:", appointment);
                this.dialog.open(AppointmentDialogueComponent, {
                    width: '400px',
                    data: appointment
                });
            },
            error: (err) => {
                console.error('❌ Failed to fetch appointment details:', err);
            }
        });
    }


}
