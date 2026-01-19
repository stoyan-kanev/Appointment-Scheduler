import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
    selector: 'app-contact-us',
    imports: [
        ReactiveFormsModule
    ],
    standalone: true,
    templateUrl: './contact-us.html',
    styleUrl: './contact-us.css',
})
export class ContactUsComponent {
    sending = false;
    sent = false;
    form: FormGroup;
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            subject: ['', [Validators.required, Validators.minLength(3)]],
            message: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    get nameCtrl() { return this.form.get('name'); }
    get emailCtrl() { return this.form.get('email'); }
    get subjectCtrl() { return this.form.get('subject'); }
    get messageCtrl() { return this.form.get('message'); }


    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        // For now: UI-only. Later you can call Django API here.
        this.sending = true;
        this.sent = false;

        setTimeout(() => {
            this.sending = false;
            this.sent = true;
            this.form.reset();
        }, 700);
    }
}
