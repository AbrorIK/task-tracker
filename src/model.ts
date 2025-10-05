export const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'] as const;
export type Priority = (typeof PRIORITIES)[number];

export interface TaskInit {
    id: string;
    title: string;
    notes?: string;
    dueDate?: Date | null;
    priority?: Priority;
    tags?: string[];
}

export class Task {
    readonly id: string;
    title: string;
    notes: string;
    dueDate: Date | null;
    priority: Priority;
    tags: string[];
    completed: boolean;
    readonly createdAt: Date;

    constructor(init: TaskInit) {
        this.id = init.id;
        this.title = init.title;
        this.notes = init.notes ?? '';
        this.dueDate = init.dueDate ?? null;
        this.priority = init.priority ?? 'LOW';
        this.tags = init.tags ?? [];
        this.completed = false;
        this.createdAt = new Date();
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    updateDetails(details: {
        title?: string;
        notes?: string;
        dueDate?: Date | null;
        priority?: Priority;
        tags?: string[];
    }) {
        if (details.title !== undefined) this.title = details.title;
        if (details.notes !== undefined) this.notes = details.notes;
        if (details.dueDate !== undefined) this.dueDate = details.dueDate;
        if (details.priority !== undefined) this.priority = details.priority;
        if (details.tags !== undefined) this.tags = [...details.tags];
    }
}
