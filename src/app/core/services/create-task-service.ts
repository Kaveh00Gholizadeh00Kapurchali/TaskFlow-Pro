import { Injectable, effect, signal } from "@angular/core";

import { ITask } from "../models/TaskModel";


@Injectable({
    providedIn: 'root'
})

export class TaskService{

    private tasks = signal<ITask[]>(this.loadTasks());
    private readonly _STORAGE_KEY = 'registered_tasks';

    constructor(){
        effect(() => {
            const value = this.tasks;
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

    

    addTask(taskData: Omit<ITask, 'taskId' | 'status' | 'createdAt'>){ 
        const newTask ={
            taskId: Date.now(),
            status: 'pending',
            createdAt: Date.now(),
            ...taskData
        };
        this.tasks.update(n_task => [...n_task, newTask])
    }
}