import { Task, TaskFormData } from "../types";
import api from "./axios";

export const taskService = {
    getAll: (filters?: {
        status?: string,
        priority?: string,
        mine?: boolean;
    }) => api.get<Task[]>('/tasks',{params: filters}),
    
    getOne: (id: number) => api.get<Task>(`/tasks/${id}`),
    
    create: (data: TaskFormData) => api.post<Task>(`/tasks/`,data),

    update: (id: number, data: Partial<TaskFormData>)=>api.put<Task>(`/tasks/${id}`, data),

    delete: (id: number) => api.delete<{message: string}>(`/tasks/${id}`),
}