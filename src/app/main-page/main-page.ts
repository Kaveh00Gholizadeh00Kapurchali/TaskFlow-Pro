import { Component, inject } from '@angular/core';

import { TopNavBar } from '../features/top-nav-bar/top-nav-bar';
import { Dialog } from '@angular/cdk/dialog';

import { TaskService } from '../core/services/create-task-service';
import { TaskModal } from '../modals/task-modal/task-modal';

@Component({
  imports: [TopNavBar],
  selector: 'app-main-page',
  styleUrl: './main-page.css',
  templateUrl: './main-page.html',
})
export class MainPage {
  taskService = inject(TaskService);

  private dialog = inject(Dialog);
  protected openTaskModal(){
    this.dialog.open(TaskModal);
  }


}
