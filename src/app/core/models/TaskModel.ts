
export interface ITask {
    taskId: number;
    taskName: string;
    taskDescription: string;
    dueDate: string;
    status: string;  // e.g., "pending", "in progress", "completed"
    priority: string; // e.g., "low", "medium", "high", "urgent"
    hourlyRate: number; // Hourly rate for the task
    createdBy: number; // User ID of the creator
    createdAt: number; // Timestamp of when the task was created

    startedAt :number | null;
    completedAt:number | null;
}
     