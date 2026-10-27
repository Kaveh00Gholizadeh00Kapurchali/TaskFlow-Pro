import { Component, inject } from '@angular/core';

import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ITask } from '../../core/models/TaskModel';


@Component({
  imports: [],
  selector: 'app-task-modal',
  styleUrl: './task-modal.css',
  templateUrl: './task-modal.html',
})
export class TaskModal {
  
  task = inject<ITask>(DIALOG_DATA);
  dialogRef = inject(DialogRef);
}
