import { Task, type Priority } from './model';

export function renderEditSelectedTask(
    task: Task,
    handleSave: (
        originalTaskId: string,
        details: {
            title: string;
            notes: string;
            dueDate: Date | null;
            priority: Priority;
            tags: string[];
        },
    ) => void,
): void {
    const mainContent = document.querySelector('main.content');
    if (!mainContent) {
        throw new Error('Missing main.content container in the DOM');
    }

    let editTask = mainContent.querySelector<HTMLElement>('.edit-task');

    if (!editTask) {
        editTask = document.createElement('aside');
        editTask.className = 'edit-task';
        mainContent.appendChild(editTask);
    }

    editTask.innerHTML = `
    <header class="panel-header">
    <h2>Edit Task</h2>
    <button class="icon-btn" type="button">✖</button>
    </header>
        <form class="edit-form">
          <label class="form-field">
            <span class="label"></span>
            <input
              class="input"
              type="text"
              name="title"
              placeholder="Task title"
            />
          </label>

          <label class="form-field">
            <span class="label">Notes</span>
            <textarea
              class="textarea"
              name="notes"
              rows="3"
              placeholder="Notes..."
            ></textarea>
          </label>

          <div class="form-row">
            <label class="form-field">
              <span class="label">Due Date</span>
              <input
                class="input"
                type="date"
                name="dueDate"
                value="2025-06-15"
              />
            </label>
            <label class="form-field">
              <span class="label">Priority</span>
              <select class="input" name="priority">
                <option>Low</option>
                <option selected>Medium</option>
                <option>High</option>
              </select>
            </label>
          </div>

          <label class="form-field">
            <span class="label">Tags</span>
            <input
              class="input"
              type="text"
              name="tags"
              placeholder="Add tags"
              value="bread, cheese"
            />
          </label>

          <div class="form-actions">
            <button type="submit" class="primary-btn">Save</button>
            <button type="button" class="ghost-btn">Cancel</button>
          </div>
        </form>`;

    const form = editTask.querySelector<HTMLFormElement>('.edit-form');
    if (!form) throw new Error('Missing .edit-form element');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);

        const title = (formData.get('title') ?? '').toString().trim();
        const notes = (formData.get('notes') ?? '').toString().trim();
        const dueDateValue = formData.get('dueDate')?.toString();
        const dueDate = dueDateValue ? new Date(dueDateValue) : null;
        const priority = (formData.get('priority')?.toString() ?? 'LOW') as Priority;
        const tags = (formData.get('tags') ?? '')
            .toString()
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean);

        handleSave(task.id, {
            title,
            notes,
            dueDate,
            priority,
            tags,
        });
    });
}
