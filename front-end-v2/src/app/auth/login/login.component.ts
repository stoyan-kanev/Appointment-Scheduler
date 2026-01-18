import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    submitForm() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe(
                data => {
                    this.loginForm.reset();
                    console.log(data);
                }
            )
        }
    }
}
