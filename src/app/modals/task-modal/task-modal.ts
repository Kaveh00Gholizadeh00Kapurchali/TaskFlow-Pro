import { Component, inject, signal } from '@angular/core';

import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { ITask } from '../../core/models/TaskModel';


@Component({
  imports: [],
  selector: 'app-task-modal',
  styleUrl: './task-modal.css',
  templateUrl: './task-modal.html',
})
export class TaskModal {
  
  task = inject<ITask>(DIALOG_DATA);
}
