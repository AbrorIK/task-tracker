import { Task } from './model';
import { renderTaskList } from './taskList';
import { renderEditSelectedTask } from './editTask';

let tasks: Task[] = [
    new Task({
        id: '1',
        title: 'Fix broken build',
        notes: 'Investigate failing CI pipeline and patch missing dependency.',
        dueDate: new Date('2025-05-10'),
        priority: 'HIGH',
        tags: ['work', 'frontend'],
    }),
    new Task({
        id: '2',
        title: 'Update documentation',
        notes: 'Revise API section for the new endpoints.',
        dueDate: new Date('2025-05-30'),
        priority: 'LOW',
        tags: ['docs', 'admin'],
    }),
    new Task({
        id: '3',
        title: 'Buy groceries',
        notes: 'Milk, eggs, spinach, tomatoes.',
        dueDate: new Date('2025-06-15'),
        priority: 'MEDIUM',
        tags: ['home'],
    }),
];

function handleToggleComplete(taskId: string, completed: boolean): void {
    const task = tasks.find(item => item.id === taskId);
    if (task) task.completed = completed;
}

function handleDelete(taskId: string): void {
    tasks = tasks.filter(task => task.id !== taskId);
    render();
}

let currentTask = tasks[0];

function render(): void {
    renderTaskList(tasks, {
        onDelete: handleDelete,
        onToggleComplete: handleToggleComplete,
    });
}

render();

function generateId(): string {
    const now = Date.now().toString(36);
    const rand = Math.random().toString(36).slice(2, 8);
    return `${now}-${rand}`;
}

function handleSave(
    originalTaskId: string,
    details: {
        title: string;
        notes: string;
        dueDate: Date | null;
        priority: Task['priority'];
        tags: string[];
    },
): void {
    tasks = tasks.filter(task => task.id !== originalTaskId);

    const newTask = new Task({
        id: generateId(),
        title: details.title,
        notes: details.notes,
        dueDate: details.dueDate,
        priority: details.priority,
        tags: details.tags,
    });

    tasks.push(newTask);
    render();
}

renderEditSelectedTask(currentTask, handleSave);
