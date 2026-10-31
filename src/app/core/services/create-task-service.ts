import { Injectable, effect, signal } from "@angular/core";

import { ITask } from "../models/TaskModel";


@Injectable({
    providedIn: 'root'
})

export class TaskService{
    private readonly _STORAGE_KEY = 'registered_tasks';

    private tasks = signal<ITask[]>(this.loadTasks());

    readonly C_tasks = this.tasks.asReadonly();

    constructor(){
        effect(() => {
            const value = this.tasks();
            if (typeof localStorage !== 'undefined')
                {
                    localStorage.setItem(this._STORAGE_KEY, JSON.stringify(value));
                } 
        })
    }



    loadTasks(): ITask[] {
        const stored = localStorage.getItem(this._STORAGE_KEY);
        if(!stored) return [];

        try{
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        }catch(error){
            console.error('Failed to parse stored Tasks: ', error);
            return [];
        }
    }



    addTask(taskData: Omit<ITask, 'taskId' | 'status' | 'createdAt'| 'hourlyRate'| 'createdBy' | 'startedAt' | 'completedAt'>){ 
        const newTask ={
            taskId: Date.now(),
            status: 'pending',
            createdAt: Date.now(),
            createdBy: 0,
            hourlyRate: 0 ,

            startedAt: null,
            completedAt: null,

            ...taskData
        };
        this.tasks.update(n_task => [...n_task, newTask])
    }

    startTask(taskId: number): void {
        this.tasks.update(tasks => tasks.map(task => task.taskId === taskId && task.status === 'pending' ? {...task , status: 'in progress', startedAt: Date.now(), completedAt: null} : task));
    }

    completeTask(taskId : number): void{
        const completedAt = Date.now()

        this.tasks.update(tasks => tasks.map(task => task.taskId === taskId && task.status === 'in progress' ? {
       
            ...task,     
            status: 'completed',
            completedAt,
        }
         : task 
        )
            );
             }
}