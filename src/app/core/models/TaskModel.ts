import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {signal} from '@angular/core';

export interface Task {
    taskId: number;
    taskName: string;
    taskDescription: string;
    dueDate: string;
    status: string;  // e.g., "pending", "in progress", "completed"
    priority: string; // e.g., "low", "medium", "high", "urgent"
    hourlyRate: number; // Hourly rate for the task
    createdBy: number; // User ID of the creator
    createdAt: string; // Timestamp of when the task was created
}




@Injectable({providedIn: 'root'})

export class TaskService {

private  _tasks = signal<Task[]>([]);
tasks = this._tasks.asReadonly();
role = signal<string[]>(['admin', 'user', 'manager']);

}
