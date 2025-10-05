import type { Task } from './model';

type RenderOptions = {
    onDelete?: (taskId: string) => void;
    onToggleComplete?: (taskId: string, completed: boolean) => void;
    onEdit?: (task: Task) => void;
};

export function renderTaskList(tasks: Task[], options: RenderOptions = {}): void {
    const mainContent = document.querySelector<HTMLElement>('main.content');
    if (!mainContent) {
        throw new Error('Missing main.content container in the DOM');
    }

    let taskList = mainContent.querySelector<HTMLElement>('.task-list');
    if (!taskList) {
        taskList = document.createElement('section');
        taskList.className = 'task-list';
        const firstChild = mainContent.firstElementChild;
        if (firstChild) {
            mainContent.insertBefore(taskList, firstChild);
        } else {
            mainContent.appendChild(taskList);
        }
    }

    taskList.innerHTML = '';

    for (const task of tasks) {
        const card = document.createElement('div');
        card.className = 'task-card';
        if (task.completed) card.classList.add('completed');

        const dueLabel = task.dueDate
            ? task.dueDate.toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
              })
            : 'No due date';

        const tagsMarkup = task.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');

        card.innerHTML = `
      <div class="task-header">
        <div class="task-left">
          <span class="task-checkbox ${task.completed ? 'checked' : ''}" aria-hidden="true"></span>
          <h3 class="task-title">${task.title}</h3>
        </div>
        <div class="task-actions">
          <button class="icon-btn" type="button" data-action="edit">✏️</button>
          <button class="icon-btn" type="button" data-action="delete">🗑️</button>
        </div>
      </div>
      <div class="task-metadata">
        <span class="badge priority ${task.priority.toLowerCase()}">${task.priority}</span>
        <span class="badge due">Due: ${dueLabel}</span>
      </div>
      <div class="task-tags">${tagsMarkup}</div>
    `;

        const checkbox = card.querySelector<HTMLSpanElement>('.task-checkbox');
        if (checkbox) {
            checkbox.addEventListener('click', () => {
                const isChecked = checkbox.classList.toggle('checked');
                card.classList.toggle('completed', isChecked);
                task.completed = isChecked;
                options.onToggleComplete?.(task.id, isChecked);
            });
        }

        const deleteButton = card.querySelector<HTMLButtonElement>('button[data-action="delete"]');
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                options.onDelete?.(task.id);
            });
        }

        const editButton = card.querySelector<HTMLButtonElement>('button[data-action="edit"]');
        if (editButton) {
            editButton.addEventListener('click', () => {
                options.onEdit?.(task);
            });
        }
        taskList.appendChild(card);
    }
}
