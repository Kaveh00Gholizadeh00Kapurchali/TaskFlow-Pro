import { Component, inject } from '@angular/core';
import { TaskService } from '../../core/services/create-task-service';

@Component({
  imports: [],
  selector: 'app-task-modal',
  styleUrl: './task-modal.css',
  templateUrl: './task-modal.html',
})
export class TaskModal {
  taskService = inject(TaskService);
}
