import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.services';

@Component({
    selector: 'app-barber-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './barber-login.html',
    styleUrl: './barber-login.css',
})
export class BarberLoginComponent {
    username = '';
    password = '';
    loading = false;

    constructor(private auth: AuthService, private router: Router) {}

    submit() {
        if (!this.username.trim() || !this.password.trim()) return;

        this.loading = true;

        this.auth.login(this.username.trim(), this.password).subscribe({
            next: (res: any) => {
                // ако промениш бекенда да върне token в body:
                // this.auth.setToken(res.token);
                // this.auth.user$.next(res.user);

                this.loading = false;
                this.router.navigateByUrl('/barber-panel');
            },
            error: (err) => {
                this.loading = false;
                alert(err?.error?.error ?? 'Грешен username/password.');
            }
        });
    }
}
