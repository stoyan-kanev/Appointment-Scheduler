import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            age: ['', Validators.required]
        })
    }
    submitForm() {
        if (this.registerForm.valid) {
            this.authService.login(this.registerForm.value).subscribe(
                data => {
                    this.registerForm.reset();
                    console.log(data);
                }
            )
        }
    }
}
