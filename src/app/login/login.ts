import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth-service';


@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  protected errorMessage = signal('');

  loginForm : FormGroup = this.fb.group({
    userName: ['',[Validators.required]],
    userPassword: ['', [Validators.required]],
  });

  get userName(){ return this.loginForm.get('userName');}
  get userPassword(){ return this.loginForm.get('userPassword');}

  onSubmit(): void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const {userName, userPassword} = this.loginForm.value;
    const success = this.auth.login(userName, userPassword);
    
    if(success){
      this.router.navigate(['']);
    }else{
      this.errorMessage.set('username or password is incorrect');
    }

  }



}
