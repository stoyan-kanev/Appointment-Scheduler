import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nav',
    imports: [
        RouterLink,
        NgIf
    ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    isAuthenticated = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.getAuthStatus().subscribe(status => {
            this.isAuthenticated = status;
        });
    }

    logout() {
        this.authService.logout();
    }
}
