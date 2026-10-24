import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../core/models/TaskModel';
import { TopNavBar } from '../features/top-nav-bar/top-nav-bar';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatMenuModule, TopNavBar],
  styleUrl: './create-task.css',
  templateUrl: './create-task.html',
})
export class CreateTask {
  private fb = inject(FormBuilder);

  // تایپ تمیز و دقیق
  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(300)]],
    dueDate: ['', Validators.required],
    priority: ['', Validators.required]
  });

  // گترهای راحت برای اعتبارسنجی در HTML
  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get dueDate() { return this.taskForm.get('dueDate'); }
  get priority() { return this.taskForm.get('priority'); }

  // متد انتخاب اولویت با کلیک روی گزینه‌های منوی متریال
  setPriority(level: 'Low' | 'Medium' | 'High'): void {
    this.taskForm.patchValue({ priority: level });
    this.priority?.markAsDirty();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
      console.log('تسک ایجاد شد:', taskData);
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
