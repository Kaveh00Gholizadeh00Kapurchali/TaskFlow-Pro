import { Component, DestroyRef, computed, inject, signal } from '@angular/core';

import { TopNavBar } from '../features/top-nav-bar/top-nav-bar';
import { Dialog} from '@angular/cdk/dialog';

import { TaskService } from '../core/services/create-task-service';
import { TaskModal } from '../modals/task-modal/task-modal';
import { ITask } from '../core/models/TaskModel';



@Component({
  imports: [TopNavBar],
  selector: 'app-main-page',
  styleUrl: './main-page.css',
  templateUrl: './main-page.html',
})
export class MainPage {
  taskService = inject(TaskService);

  protected now = signal(Date.now());
  protected destroyRef = inject(DestroyRef);

  constructor(){
    const timerId = setInterval(() =>{
      this.now.set(Date.now());
    }, 1000)

    this.destroyRef.onDestroy(() => {
      clearInterval(timerId)
    })
  }

  protected pendingTasks = computed(() =>
    this.taskService.C_tasks().filter(task => task.status === 'pending')
  );

  protected inProgressTasks = computed(() =>
    this.taskService.C_tasks().filter(task => task.status === 'in progress')
  );

  private dialog = inject(Dialog);
  protected openTaskModal(task: ITask){
    this.dialog.open(TaskModal, {
      data: task,
      ariaLabel: `Details for ${task.taskName}`
    });
  }

  protected startTask (task: ITask){
    this.taskService.startTask(task.taskId)
  }

  protected completeTask(task: ITask){
    this.taskService.completeTask(task.taskId)
  }

  protected elapsedMiliSeconds(task: ITask): number{
    if(task.startedAt === null){
      return 0;
    }
    const endTime = task.status === 'completed' ? task.completedAt : Date.now();
    if (endTime === null){
      return 0;
    }
    return Math.max(0, endTime - task.startedAt);
  }

  protected formatDuration(miliseconds: number) : string {
    const totalSeconds = Math.floor(miliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0')
    ].join(':');
  }
}
