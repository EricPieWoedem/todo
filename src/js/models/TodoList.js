import { Todo } from "./Todo.js";

export class TodoList {
  constructor() {
    this.todos = [];
  }

  // Add a new todo
  addTodo(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
      return true;
    }
    return false;
  }

  // Remove a todo by id
  removeTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get all todos
  getAllTodos() {
    return [...this.todos];
  }

  // Get todos by project
  getTodosByProject(project) {
    return this.todos.filter((todo) => todo.getProject() === project);
  }

  // Get todos by completion status
  getTodosByCompletion(completed) {
    return this.todos.filter((todo) => todo.isCompleted() === completed);
  }

  // Get todos by priority
  getTodosByPriority(priority) {
    return this.todos.filter((todo) => todo.getPriority() === priority);
  }

  // Get todos due today
  getTodosDueToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.todos.filter((todo) => {
      const dueDate = new Date(todo.getDueDate());
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });
  }

  // Get upcoming todos
  getUpcomingTodos() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.todos.filter((todo) => {
      const dueDate = new Date(todo.getDueDate());
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() > today.getTime();
    });
  }
}
