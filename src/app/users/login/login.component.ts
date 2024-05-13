import { UserSessionService } from './../../services/UserSessionService';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/ApiService';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private userSessionService: UserSessionService,
    private router: Router,
    private messageService: MessageService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.apiService.login(username, password).subscribe((response: any) => {
        if (response.result && Array.isArray(response.result) && response.result.length > 0) {
          console.log(response.result);
          this.userSessionService.setUser(response.result[0]);
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Please check your username and password.' });
        }
      }, error => {
        console.error('An error occurred during login:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again later.' });
      });
    }
  }

}
