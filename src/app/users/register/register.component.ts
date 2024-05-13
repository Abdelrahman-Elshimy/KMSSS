import { MessageService } from 'primeng/api';
import { ApiService } from './../../services/ApiService';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private messageService: MessageService, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });


  }

  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
  }

  onSubmit() {

    var user = this.registrationForm.value;
    if (this.registrationForm.valid) {
      // Handle form submission (e.g., send data to server)
      console.log(this.registrationForm.value);

      this.apiService.loginByUsername(user.username, user.password).subscribe((response: any) => {
        if (response.result && Array.isArray(response.result) && response.result.length > 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username already exist' });
        } else {
          this.apiService.loginByEmail(user.email, user.password).subscribe((response: any) => {
            if (response.result && Array.isArray(response.result) && response.result.length > 0) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email already exist' });
            }else {
              this.apiService.Register(this.registrationForm.value).subscribe((res:any) => {
                console.log(res)
                if(res.transactionId) {
                  this.messageService.add({ severity: 'success', summary: 'Register Successful', detail: 'You have successfully Registered.' });
                  this.router.navigate(['/login']);
                }else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again later.' });
                }
              })
            }
          });
        }
      }, error => {
        console.error('An error occurred during register:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again later.' });
      });

    }
  }
}
