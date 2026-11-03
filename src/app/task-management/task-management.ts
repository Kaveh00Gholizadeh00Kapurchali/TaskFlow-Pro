import { Component, computed , signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TaskService } from '../core/services/create-task-service';
import { UserService } from '../core/services/create-user-service';

type StatusFilter = 'all' | 'pending' | 'in progress' | 'completed';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-task-management',
  styleUrl: './task-management.css',
  templateUrl: './task-management.html',
})
export class TaskManagement {

  private taskService = inject(TaskService);
  private userService = inject(UserService);

  protected selectedStatus = signal<StatusFilter>('all');
  protected allTask = this.taskService.C_tasks;

  protected filteredTasks = computed(()=>{
    const status = this.selectedStatus();
    const tasks = this.allTask();

    if(status === 'all'){
      return tasks;
    }

    return tasks.filter((task) => task.status === status);
  });

  protected pendingCount = computed(()=> this.allTask().filter((task) => task.status === 'pending').length);
  protected inProgressCount = computed (()=> this.allTask().filter((task) => task.status === 'in progress').length);
  protected completedCount = computed (() => this.allTask().filter((task) => task.status === 'complete').length); 

  protected setStatusFilter(status: StatusFilter) : void {
    this.selectedStatus.set(status);
  }

  protected assigneeName(userId : number | null | undefined): string {
    if ( userId === null){
      return 'Unassigned';
    }

    const user = this.userService.C_users().find((item) => item.userId === userId);

    return user?.userName ?? 'Unknown user';
  }

  protected resetTask (taskId: number):void{
    this.taskService.resetTaskManagement(taskId);
  }

  protected completeTask (taskId: number): void{
    this.taskService.completeTaskManagement(taskId);
  }

}
