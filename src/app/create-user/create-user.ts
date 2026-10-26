import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../core/services/create-user-service';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-create-user',
  styleUrl: './create-user.css',
  templateUrl: './create-user.html',
})
export class CreateUser {
  private fb = inject(FormBuilder);
  protected userService = inject(UserService);

  registerForm : FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    userPassword: ['', [Validators.required, Validators.minLength(6)]],
    userEmail: ['',[Validators.required, Validators.email]],
    userRole : ['', Validators.required]
  })

  onSubmit(): void{
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    this.userService.addUser(this.registerForm.value);
    this.registerForm.reset();
  }

}
