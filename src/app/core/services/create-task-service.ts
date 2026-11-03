import { Injectable, effect, signal, inject} from "@angular/core";

import { ITask } from "../models/TaskModel";


import { AuthService } from "./auth-service";

@Injectable({
    providedIn: 'root'
})

export class TaskService{
    private readonly _STORAGE_KEY = 'registered_tasks';

    private tasks = signal<ITask[]>(this.loadTasks());

    readonly C_tasks = this.tasks.asReadonly();

    private auth = inject(AuthService);

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



    addTask(taskData: Omit<ITask, 'taskId' | 'status' | 'createdAt'| 'hourlyRate'| 'createdBy' | 'startedAt' | 'completedAt' |'assignedTo'>): void{
        
        const currentUser = this.auth.C_currentUser();
        if(!currentUser){
            return;
        }

        const newTask ={
            taskId: Date.now(),
            status: 'pending',
            createdAt: Date.now(),
            createdBy: this.auth.C_currentUser()?.userId ?? 0,
            hourlyRate: 0 ,

            startedAt: null,
            completedAt: null,

            assignedTo: null,            // تسکو کی گردن میگیره

            ...taskData
        };
        this.tasks.update(n_task => [...n_task, newTask])
    }

    startTask(taskId: number): void {
        const currentUser= this.auth.C_currentUser();
        if(!currentUser){
            return;
        }

        this.tasks.update(tasks => tasks.map((task) => 
         {const canSeeTask = currentUser.userRole === 'admin' || currentUser.userRole === 'manager' || task.visibleToRole === currentUser.userRole ;

            const canStartTask = canSeeTask && task.taskId === taskId && task.status === 'pending' && task.assignedTo === null;
            
            if(!canStartTask){
                return task;
            }

            return{
                ...task,
                status: 'in progress',
                assignedTo: currentUser.userId,
                startedAt: Date.now(),
                completedAt: null,
            };
         }));
        }

    completeTask(taskId: number): void {
        const currentUser = this.auth.C_currentUser();

        if (!currentUser) {
            return;
        }

        this.tasks.update((tasks) =>
            tasks.map((task) => {
            const canComplete =
                task.taskId === taskId &&
                task.status === 'in progress' &&
                (
                task.assignedTo === currentUser.userId ||
                currentUser.userRole === 'admin'
                );

            if (!canComplete) {
                return task;
            }

            return {
                ...task,
                status: 'completed',
                completedAt: Date.now(),
            };
            })
        );
    }


    resetTaskManagement(taskId: number):void {
        const currentUser = this.auth.C_currentUser()

        if(!currentUser ||
            (currentUser.userRole !== 'admin' && currentUser.userRole !== 'manager')
        ){
            return;
        }

        this.tasks.update((tasks) => tasks.map((task) => {
            const canReset = task.taskId === taskId && (task.status === 'in progress' || task.status === 'compeleted')
            if(!canReset){
                return task;
            }
            return{
                ...task,
                status : 'pending',
                assignedTo: null,
                startedAt:null,
                completedAt: null
            };
        })
    );
}

   completeTaskManagement (taskId: number):void {
        const currentUser = this.auth.C_currentUser()

        if(!currentUser ||
            (currentUser.userRole !== 'admin' && currentUser.userRole !== 'manager')
        ){
            return;
        }

        this.tasks.update((tasks) => tasks.map((task) => {
            const canReset = task.taskId === taskId && task.status === 'in progress';
            if(!canReset){
                return task;
            }
            return{
                ...task,
                status : 'completed',
                completedAt: Date.now()
            };
        })
    );
}


}