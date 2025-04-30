export class Todo {
  constructor(
    title,
    details = "",
    dueDate = null,
    project = null,
    isImportant = false
  ) {
    this.title = title;
    this.details = details;
    this.dueDate = dueDate;
    this.project = project;
    this.isImportant = isImportant;
    this.completed = false;
    this.id = Date.now().toString();
  }

  // Getters
  getTitle() {
    return this.title;
  }

  getDetails() {
    return this.details;
  }

  getDueDate() {
    return this.dueDate;
  }

  getProject() {
    return this.project;
  }

  isCompleted() {
    return this.completed;
  }

  isImportant() {
    return this.isImportant;
  }

  // Setters
  setTitle(title) {
    this.title = title;
  }

  setDetails(details) {
    this.details = details;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setProject(project) {
    this.project = project;
  }

  // Actions
  toggleComplete() {
    this.completed = !this.completed;
  }

  updateDetails(newDetails) {
    this.details = newDetails;
  }

  updateDueDate(newDate) {
    this.dueDate = newDate;
  }

  updateProject(newProject) {
    this.project = newProject;
  }

  toggleImportant() {
    this.isImportant = !this.isImportant;
  }
}
