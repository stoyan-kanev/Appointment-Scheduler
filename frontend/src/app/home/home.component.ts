import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ReservationPopupComponent} from './reservation-popup/reservation-popup.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    currentDate: Date = new Date();
    selectedDay: string | null = null;
    daysInMonth: any[] = [];
    dayNames: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    constructor(private dialog: MatDialog) {
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
                    // It can be changed to proper appointment times
                    { time: '15:00' },
                    { time: '15:30' },
                    { time: '16:00' },
                    { time: '16:30' },
                    { time: '17:00' }
                ]
            });
        }
    }
    changeMonth(offset: number) {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1);
        this.generateMonth();
        this.selectedDay = null;
    }
    getSelectedDaySlots() {
        if (!this.selectedDay) return [];

        const day = this.daysInMonth.find(d => {
            if (!d) return false;

            const localDate = new Date(d.date.getFullYear(), d.date.getMonth(), d.date.getDate());
            const formattedDate = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;

            return formattedDate === this.selectedDay;
        });

        return day ? day.slots : [];
    }


    selectDay(day: any) {
        if (day) {
            const localDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());

            const year = localDate.getFullYear();
            const month = String(localDate.getMonth() + 1).padStart(2, '0');
            const date = String(localDate.getDate()).padStart(2, '0');

            this.selectedDay = `${year}-${month}-${date}`;
        }
    }



    openReservationPopup(time: string) {
        if (!this.selectedDay) {
            console.error("No date selected!");
            return;
        }

        this.dialog.open(ReservationPopupComponent, {
            width: '400px',
            data: { date: this.selectedDay, time }
        });
    }


}
