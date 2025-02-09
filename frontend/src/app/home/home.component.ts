import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    currentDate: Date = new Date();
    selectedDay: string | null = null;
    daysInMonth: any[] = [];
    dayNames: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']; // Days start from Monday

    constructor() {
        this.generateMonth();
    }

    generateMonth() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        this.daysInMonth = [];

        // Adjust first day to start on Monday
        let adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < adjustedFirstDay; i++) {
            this.daysInMonth.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            this.daysInMonth.push({
                date: new Date(year, month, day),
                slots: [
                    { time: '15:00 - 16:30', reserved: false },
                    { time: '16:30 - 18:00', reserved: false },
                    { time: '18:00 - 19:30', reserved: Math.random() > 0.7 }, // Random reserved
                    { time: '19:30 - 21:00', reserved: false },
                    { time: '21:00 - 22:30', reserved: false }
                ]
            });
        }
    }

    changeMonth(offset: number) {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1);
        this.generateMonth();
        this.selectedDay = null;
    }

    selectDay(day: any) {
        if (day) {
            this.selectedDay = day.date.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
    }

    getSelectedDaySlots() {

        return this.daysInMonth.find(d => d && d.date.toLocaleDateString('bg-BG') === this.selectedDay)?.slots || [];
    }

    reserveSlot(slotIndex: number) {
        const day = this.daysInMonth.find(d => d && d.date.toLocaleDateString('bg-BG') === this.selectedDay);
        if (day) {
            day.slots[slotIndex].reserved = true;
        }
    }
}
