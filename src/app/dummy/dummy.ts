import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-dummy',
  styleUrl: './dummy.css',
  templateUrl: './dummy.html',
})
export class Dummy {

  private fb = inject(FormBuilder);

  userform!: FormGroup;

  ngOnInit(): void {
    this.userform = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email ,Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(){
    return this.userform?.controls;
  }

  onSubmit(): void{
    if(this.userform.valid){
      console.log('فرم تمیز اماده ارسال:', this.userform.value);
      alert('فرم با موفقیت ارسال شد');
      this.userform.reset();
    }else{
      this.userform.markAllAsTouched();
    }
  }

  fillWithSampleData():void{
    this.userform.patchValue({
      username: 'kaveh-dev',
      email : 'kaveh@example.com'
    });
  }

}
