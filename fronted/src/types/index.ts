export interface User {
    id: number; 
    name: string;
    email: string;
    created_at: string;
    update_at: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    token_type: string;
}

export type TaskStatus = 'a_faire' | 'en_cours' | 'termine';
export type TaskPriority = 'base' | 'normale' | 'haute';

export interface Task {
    id: number; 
    user_id: number;
    assigned_to: number | null;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: string | null;
    creator?: User;
    assignee?: User|null;
    created_at: string;
    update_at: string;
}

export interface TaskFormData {
    title: string;
    description?: string | null;
    status?: TaskStatus;
    priority?: TaskPriority;
    assigned_to?: number | null;
    due_date?: string | null;
}

export interface ApiError{
    message: string;
    errors?: Record<string, string[]>;
}