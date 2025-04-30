import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Todo } from "../models/Todo.js";

export class TaskUI {
  constructor(todoList) {
    this.todoList = todoList;
    this.modal = document.getElementById("addTaskModal");
    this.form = document.getElementById("addTaskForm");
    this.editModal = document.getElementById("editTaskModal");
    this.editForm = document.getElementById("editTaskForm");
    this.dateInput = document.getElementById("taskDate");
    this.editDateInput = document.getElementById("editTaskDate");
    this.calendar = null;
    this.editCalendar = null;
    this.currentTask = null;
    this.initializeEventListeners();
    this.initializeCalendars();
  }

  initializeCalendars() {
    this.calendar = flatpickr(this.dateInput, {
      dateFormat: "j F, Y",
      minDate: "today",
    });

    this.editCalendar = flatpickr(this.editDateInput, {
      dateFormat: "j F, Y",
      minDate: "today",
    });
  }

  initializeEventListeners() {
    // Form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleAddTask();
    });

    // Modal close buttons
    this.modal
      .querySelector(".close-modal")
      .addEventListener("click", () => this.closeModal());
    this.modal
      .querySelector(".cancel-button")
      .addEventListener("click", () => this.closeModal());

    // Add button in modal
    this.modal.querySelector(".add-button").addEventListener("click", () => {
      this.handleAddTask();
    });

    // Edit Task Modal
    this.editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleEditTask();
    });

    this.editModal
      .querySelector(".close-modal")
      .addEventListener("click", () => this.closeEditModal());
    this.editModal
      .querySelector(".cancel-button")
      .addEventListener("click", () => this.closeEditModal());
    this.editModal
      .querySelector(".add-button")
      .addEventListener("click", () => this.handleEditTask());
  }

  openModal() {
    // Populate project dropdown
    this.populateProjectDropdown(document.getElementById("taskProject"));
    this.modal.classList.add("active");
  }

  closeModal() {
    this.modal.classList.remove("active");
    this.form.reset();
  }

  openEditModal(task) {
    this.currentTask = task;
    this.populateEditForm(task);
    this.populateProjectDropdown(document.getElementById("editTaskProject"));
    this.editModal.classList.add("active");
  }

  closeEditModal() {
    this.editModal.classList.remove("active");
    this.editForm.reset();
    this.currentTask = null;
  }

  populateProjectDropdown(selectElement) {
    selectElement.innerHTML = "";

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Project";
    selectElement.appendChild(defaultOption);

    // Add only projects from the Projects section
    const projectsSection = document.querySelector(".projects-section");
    const projectButtons = projectsSection.querySelectorAll(
      ".nav-item:not(.add-project-button)"
    );
    projectButtons.forEach((button) => {
      const projectName = button.querySelector(".nav-text").textContent;
      const option = document.createElement("option");
      option.value = projectName.toLowerCase();
      option.textContent = projectName;
      selectElement.appendChild(option);
    });
  }

  populateEditForm(task) {
    document.getElementById("editTaskTitle").value = task.title;
    document.getElementById("editTaskDetails").value = task.details || "";
    document.getElementById("editTaskDate").value = task.dueDate || "";
    document.getElementById("editTaskProject").value = task.project || "";
    document.getElementById("editTaskImportant").checked = task.isImportant;
  }

  handleAddTask() {
    const title = document.getElementById("taskTitle").value;
    const details = document.getElementById("taskDetails").value;
    const dueDate = this.dateInput.value;
    const project = document.getElementById("taskProject").value;
    const isImportant = document.getElementById("taskImportant").checked;

    if (title) {
      const todo = new Todo(title, details, dueDate, project, isImportant);
      this.todoList.addTodo(todo);
      this.renderTask(todo);
      this.closeModal();

      // Show success message
      this.showSuccessMessage("Task added successfully!");
    }
  }

  handleEditTask() {
    if (!this.currentTask) return;

    const title = document.getElementById("editTaskTitle").value;
    const details = document.getElementById("editTaskDetails").value;
    const dueDate = this.editDateInput.value;
    const project = document.getElementById("editTaskProject").value;
    const isImportant = document.getElementById("editTaskImportant").checked;

    if (title) {
      // Update task properties
      this.currentTask.title = title;
      this.currentTask.details = details;
      this.currentTask.dueDate = dueDate;
      this.currentTask.project = project;
      this.currentTask.isImportant = isImportant;

      // Update the task in the DOM
      const taskItem = document.querySelector(
        `[data-task-id="${this.currentTask.id}"]`
      );
      if (taskItem) {
        this.updateTaskInDOM(taskItem, this.currentTask);
      }

      this.closeEditModal();
      this.showSuccessMessage("Task updated successfully!");
    }
  }

  updateTaskInDOM(taskItem, task) {
    // Update title
    taskItem.querySelector(".task-title").textContent = task.title;

    // Update details
    taskItem.querySelector(".task-details p").textContent =
      task.details || "No details provided";

    // Update date
    taskItem.querySelector(".task-date").textContent =
      `Due: ${task.dueDate || "No date"}`;

    // Update project
    const projectSpan = taskItem.querySelector(".task-project");
    if (task.project) {
      if (!projectSpan) {
        const newProjectSpan = document.createElement("span");
        newProjectSpan.className = "task-project";
        newProjectSpan.textContent = task.project;
        taskItem
          .querySelector(".task-actions")
          .insertBefore(newProjectSpan, taskItem.querySelector(".task-edit"));
      } else {
        projectSpan.textContent = task.project;
      }
    } else if (projectSpan) {
      projectSpan.remove();
    }

    // Update important status
    if (task.isImportant) {
      taskItem.classList.add("important");
    } else {
      taskItem.classList.remove("important");
    }
  }

  showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = message;
    document.body.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
  }

  renderTask(todo) {
    const tasksList = document.querySelector(".tasks-list");
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.setAttribute("data-task-id", todo.id);

    if (todo.isImportant) taskItem.classList.add("important");
    if (todo.project) taskItem.setAttribute("data-project", todo.project);

    taskItem.innerHTML = `
            <div class="task-checkbox">
                <input type="checkbox" class="task-complete" />
            </div>
            <div class="task-content">
                <div class="task-header">
                    <h4 class="task-title">${todo.title}</h4>
                    <div class="task-actions">
                        <span class="task-date">Due: ${todo.dueDate || "No date"}</span>
                        ${todo.project ? `<span class="task-project">${todo.project}</span>` : ""}
                        <button class="task-edit">✏️</button>
                        <button class="task-expand">▼</button>
                        <button class="task-delete">🗑️</button>
                    </div>
                </div>
                <div class="task-details">
                    <p>${todo.details || "No details provided"}</p>
                </div>
            </div>
        `;

    // Add event listeners
    const expandBtn = taskItem.querySelector(".task-expand");
    const deleteBtn = taskItem.querySelector(".task-delete");
    const editBtn = taskItem.querySelector(".task-edit");
    const completeCheckbox = taskItem.querySelector(".task-complete");
    const detailsDiv = taskItem.querySelector(".task-details");

    expandBtn.addEventListener("click", () => {
      detailsDiv.classList.toggle("expanded");
      expandBtn.textContent = detailsDiv.classList.contains("expanded")
        ? "▲"
        : "▼";
    });

    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this task?")) {
        this.todoList.removeTodo(todo.id);
        taskItem.remove();
      }
    });

    editBtn.addEventListener("click", () => {
      this.openEditModal(todo);
    });

    completeCheckbox.addEventListener("change", () => {
      taskItem.classList.toggle("completed");
      if (taskItem.classList.contains("completed")) {
        const completedSection = document.querySelector(
          '[data-section="completed"]'
        );
        if (completedSection) {
          completedSection.click();
        }
      }
    });

    tasksList.appendChild(taskItem);
  }
}
