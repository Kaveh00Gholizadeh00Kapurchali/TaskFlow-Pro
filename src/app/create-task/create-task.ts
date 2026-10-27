import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ITask } from '../core/models/TaskModel';
import { TopNavBar } from '../features/top-nav-bar/top-nav-bar';
import { TaskService } from '../core/services/create-task-service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatMenuModule, TopNavBar],
  styleUrl: './create-task.css',
  templateUrl: './create-task.html',
})
export class CreateTask {
  private fb = inject(FormBuilder);
  protected taskService = inject(TaskService);


  // تایپ تمیز و دقیق
  taskForm: FormGroup = this.fb.group({
    taskName: ['', [Validators.required, Validators.minLength(3)]],
    taskDescription: ['', [Validators.maxLength(300)]],
    createdBy: ['', [Validators.required]],
    dueDate: ['', Validators.required],
    priority: ['', Validators.required]
  });

  // گترهای راحت برای اعتبارسنجی در HTML
  get taskName() { return this.taskForm.get('taskName'); }
  get taskDescription() { return this.taskForm.get('taskDescription'); }
  get dueDate() { return this.taskForm.get('dueDate'); }
  get priority() { return this.taskForm.get('priority'); }
  get createdBy() { return this.taskForm.get('createdBy'); }

  // متد انتخاب اولویت با کلیک روی گزینه‌های منوی متریال
  setPriority(level: 'Low' | 'Medium' | 'High' | 'Urgent'): void {
    this.taskForm.patchValue({ priority: level });
    this.priority?.markAsDirty();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: ITask = this.taskForm.value;
      console.log('تسک ایجاد شد:', taskData);
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
