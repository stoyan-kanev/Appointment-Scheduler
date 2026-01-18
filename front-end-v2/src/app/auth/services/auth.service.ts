import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginInfo } from '../types/login.interface';
import { RegisterInterface } from '../types/register.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    API_URL = 'http://localhost:8000/users/';
    private isAuthenticated = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        this.checkTokenValidity();
    }

    login(loginData: loginInfo): Observable<any> {
        return new Observable(observer => {
            this.http.post(this.API_URL + 'login', loginData, { withCredentials: true }).subscribe({
                next: () => {
                    this.isAuthenticated.next(true);
                    observer.next({ success: true });
                    observer.complete();
                },
                error: (err) => {
                    this.isAuthenticated.next(false);
                    observer.error(err);
                }
            });
        });
    }

    register(registerData: RegisterInterface): Observable<any> {
        return this.http.post(this.API_URL + 'register', registerData, { withCredentials: true });
    }

    checkTokenValidity() {
        this.http.get<{ message: string, user: string }>(this.API_URL + 'verify-token', { withCredentials: true })
            .subscribe({
                next: () => this.isAuthenticated.next(true),
                error: () => this.isAuthenticated.next(false)
            });
    }

    getAuthStatus() {
        return this.isAuthenticated.asObservable();
    }

    logout() {
        this.http.post(this.API_URL + 'logout', {}, { withCredentials: true }).subscribe({
            next: () => {
                this.isAuthenticated.next(false);
            },
            error: (err) => console.error('Logout failed', err)
        });
    }

}
