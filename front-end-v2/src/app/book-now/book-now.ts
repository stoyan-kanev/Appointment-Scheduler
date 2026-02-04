import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { finalize, Observable, shareReplay } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RoleLabelPipe } from '../pipe/role-label.pipe';
import { BarberService, ListBarber } from '../services/barber.services';
import { AppointmentService } from '../services/appointment.services';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-book-now',
    imports: [AsyncPipe, RoleLabelPipe, FormsModule],
    templateUrl: './book-now.html',
    styleUrl: './book-now.css',
})
export class BookNowComponent {
    @Input() patternUrl = 'page.svg';

    selectedService = '';
    selectedBarber: ListBarber | undefined;

    barbers$: Observable<ListBarber[]>;
    trackBarber = (index: number, barber: ListBarber) => barber?.id ?? index;

    minDate = this.toISODate(new Date());
    selectedDate = ''; // YYYY-MM-DD
    selectedSlot: string | null = null;

    // 09:00–19:00 през 30 мин
    timeSlots = this.buildTimeSlots('09:00', '19:00', 30);

    availabilityLoading = false;
    bookingInFlight = false;

    // ВАЖНО: държим нов Set (immutable update), за да няма “появява се след клик” glitches
    reservedSlots = new Set<string>();

    clientForm = {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    };

    constructor(
        private barberService: BarberService,
        private appointmentService: AppointmentService,
        private cdr: ChangeDetectorRef
    ) {
        this.barbers$ = this.barberService.listBarbers().pipe(shareReplay(1));
    }

    get canPickDateTime() {
        return !!this.selectedService && !!this.selectedBarber;
    }

    get canSubmitBooking() {
        return !!this.selectedSlot
            && !this.bookingInFlight
            && !!this.clientForm.first_name.trim()
            && !!this.clientForm.last_name.trim()
            && !!this.clientForm.email.trim()
            && !!this.clientForm.phone.trim();
    }

    selectService(serviceName: string) {
        this.selectedService = serviceName;
        this.resetStep3(true);
    }

    selectBarber(barber: ListBarber) {
        this.selectedBarber = barber;

        this.selectedSlot = null;
        this.reservedSlots = new Set<string>(); // ✅ new Set (immutable)
        this.resetClientForm();

        if (this.selectedDate) {
            this.fetchReservedSlots();
        }
    }

    onDateChange(dateISO: string) {
        // ngModelChange вече идва надеждно
        this.selectedDate = dateISO;
        this.selectedSlot = null;
        this.reservedSlots = new Set<string>(); // ✅ new Set (immutable)
        this.resetClientForm();

        this.fetchReservedSlots();
    }

    fetchReservedSlots() {
        if (!this.canPickDateTime || !this.selectedDate || !this.selectedBarber) return;

        this.availabilityLoading = true;

        const barberName = this.selectedBarber.name;

        this.appointmentService.getReservedSlots(this.selectedDate, barberName).pipe(
            finalize(() => {
                this.availabilityLoading = false;
                this.cdr.detectChanges();
            })
        ).subscribe({
            next: (res) => {
                // ✅ ключов fix: не mutate-ваме Set-а с add/clear, а сменяме reference
                this.reservedSlots = new Set(res?.reserved_slots ?? []);
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
                this.reservedSlots = new Set<string>();
                this.cdr.detectChanges();
            }
        });
    }

    isSlotFree(slot: string) {
        return !this.reservedSlots.has(slot);
    }

    selectSlot(slot: string) {
        if (!this.isSlotFree(slot)) return;
        this.selectedSlot = slot;
        // не чистим формата тук, за да не дразним user-а ако си е попълнил и сменя слот
    }

    confirmBooking() {
        if (!this.selectedBarber || !this.selectedService || !this.selectedDate || !this.selectedSlot) return;

        // ✅ бекстоп валидация
        if (!this.canSubmitBooking) {
            alert('Моля, попълнете всички полета.');
            return;
        }

        this.bookingInFlight = true;

        const payload = {
            first_name: this.clientForm.first_name.trim(),
            last_name: this.clientForm.last_name.trim(),
            email: this.clientForm.email.trim(),
            phone: this.clientForm.phone.trim(),

            service_type: this.selectedService,
            barber_name: this.selectedBarber.name,
            date_time: `${this.selectedDate} ${this.selectedSlot}` // "YYYY-MM-DD HH:MM"
        };

        this.appointmentService.createAppointment(payload).pipe(
            finalize(() => {
                this.bookingInFlight = false;
                this.cdr.detectChanges();
            })
        ).subscribe({
            next: () => {
                // ✅ refresh на слотовете + UI reset
                this.fetchReservedSlots();
                this.selectedSlot = null;
                this.resetClientForm();
                alert('Часът е запазен успешно!');
            },
            error: (err) => {
                if (err?.status === 409) {
                    alert('Този час току-що беше зает. Моля, изберете друг.');
                    this.fetchReservedSlots();
                } else {
                    console.error(err);
                    alert('Грешка при запазване.');
                }
            }
        });
    }

    private resetClientForm() {
        this.clientForm = { first_name: '', last_name: '', email: '', phone: '' };
    }

    /**
     * resetStep3(true) => “твърд” reset (услуга/бръснар сменени) -> чистим и form
     * resetStep3(false) => “мек” reset (рядко нужен)
     */
    private resetStep3(hardReset: boolean) {
        this.selectedDate = '';
        this.selectedSlot = null;
        this.reservedSlots = new Set<string>();
        this.availabilityLoading = false;

        if (hardReset) this.resetClientForm();

        this.cdr.detectChanges();
    }

    private buildTimeSlots(startHHmm: string, endHHmm: string, stepMinutes: number) {
        const [sh, sm] = startHHmm.split(':').map(Number);
        const [eh, em] = endHHmm.split(':').map(Number);

        const start = sh * 60 + sm;
        const end = eh * 60 + em;

        const slots: string[] = [];
        for (let m = start; m <= end; m += stepMinutes) {
            const hh = String(Math.floor(m / 60)).padStart(2, '0');
            const mm = String(m % 60).padStart(2, '0');
            slots.push(`${hh}:${mm}`);
        }
        return slots;
    }

    private toISODate(d: Date) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }
}
