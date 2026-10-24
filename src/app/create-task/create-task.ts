import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { validate } from '@angular/forms/signals';

import { Task } from '../core/models/TaskModel';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatMenuModule],
  selector: 'app-create-task',
  styleUrl: './create-task.css',
  templateUrl: './create-task.html',
})
export class CreateTask {

  private fb = inject(FormBuilder);

  taskForm : FormGroup | Task = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(300)]],
    dueDate: ['', Validators.required],
    priority: ['', Validators.required]
  });

 }
