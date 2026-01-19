import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, ContactPayload } from '../services/contact.service';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './contact-us.html',
    styleUrls: ['./contact-us.css'],
})
export class ContactUsComponent {
    sending = false;
    sent = false;
    serverError: string | null = null;

    form: FormGroup;

    constructor(private fb: FormBuilder, private contactService: ContactService) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            subject: ['', [Validators.required, Validators.minLength(3)]],
            message: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    // getters (as you chose)
    get nameCtrl() { return this.form.get('name'); }
    get emailCtrl() { return this.form.get('email'); }
    get subjectCtrl() { return this.form.get('subject'); }
    get messageCtrl() { return this.form.get('message'); }

    submit(): void {
        this.serverError = null;
        this.sent = false;

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const payload: ContactPayload = {
            name: this.form.value.name,
            email: this.form.value.email,
            phone: this.form.value.phone || '',
            subject: this.form.value.subject,
            message: this.form.value.message,
        };

        this.sending = true;

        this.contactService.createContact(payload).subscribe({
            next: () => {
                this.sending = false;
                this.sent = true;
                this.form.reset();
            },
            error: (err) => {
                this.sending = false;

                // show something useful
                if (err?.error && typeof err.error === 'object') {
                    // DRF validation errors
                    this.serverError = 'Please check your input and try again.';
                } else {
                    this.serverError = 'Server error. Try again later.';
                }

                console.log('Contact form error:', err);
            }
        });
    }
}
