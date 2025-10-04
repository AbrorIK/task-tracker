import { Task } from "./model";
import { renderTaskList } from "./taskList";

let tasks: Task[] = [
  new Task({
    id: "1",
    title: "Fix broken build",
    notes: "Investigate failing CI pipeline and patch missing dependency.",
    dueDate: new Date("2025-05-10"),
    priority: "High",
    tags: ["work", "frontend"],
  }),
  new Task({
    id: "2",
    title: "Update documentation",
    notes: "Revise API section for the new endpoints.",
    dueDate: new Date("2025-05-30"),
    priority: "Low",
    tags: ["docs", "admin"],
  }),
  new Task({
    id: "3",
    title: "Buy groceries",
    notes: "Milk, eggs, spinach, tomatoes.",
    dueDate: new Date("2025-06-15"),
    priority: "Medium",
    tags: ["home"],
  }),
];

function handleToggleComplete(taskId: string, completed: boolean): void {
  const task = tasks.find((item) => item.id === taskId);
  if (task) task.completed = completed;
}

function handleDelete(taskId: string): void {
  tasks = tasks.filter((task) => task.id !== taskId);
  render();
}

function render(): void {
  renderTaskList(tasks, {
    onDelete: handleDelete,
    onToggleComplete: handleToggleComplete,
  });
}

render();
