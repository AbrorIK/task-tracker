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

let currentTask: Task | null = tasks[0] ?? null;

function render(): void {
    renderTaskList(tasks, {
        onDelete: handleDelete,
        onToggleComplete: handleToggleComplete,
        onEdit: selectedTask => {
            currentTask = selectedTask;
            renderCurrentTaskEditor();
        },
    });

    renderCurrentTaskEditor();
}

function handleDelete(taskId: string): void {
    tasks = tasks.filter(task => task.id !== taskId);
    if (currentTask?.id === taskId) {
        currentTask = tasks[0] ?? null;
    }
    render();
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
    const task = tasks.find(item => item.id === originalTaskId);
    if (!task) return;

    task.updateDetails(details);
    render();
}

function renderCurrentTaskEditor(): void {
    if (!currentTask) {
        const panel = document.querySelector('.edit-task');
        panel?.remove();
        return;
    }

    const taskToEdit = currentTask;
    renderEditSelectedTask(taskToEdit, editorDetails => handleSave(taskToEdit.id, editorDetails));
}

render();
