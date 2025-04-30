export class ProjectUI {
  constructor(todoList) {
    this.todoList = todoList;
    this.modal = document.getElementById("addProjectModal");
    this.form = document.getElementById("addProjectForm");
    this.projectsSection = document.querySelector(".projects-section");
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleAddProject();
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
      this.handleAddProject();
    });

    // Handle project deletion
    this.projectsSection.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".project-delete");
      if (deleteBtn) {
        const projectItem = deleteBtn.closest(".nav-item");
        const projectName = projectItem.querySelector(".nav-text").textContent;
        this.handleDeleteProject(projectItem, projectName);
      }
    });
  }

  openModal() {
    this.modal.classList.add("active");
  }

  closeModal() {
    this.modal.classList.remove("active");
    this.form.reset();
  }

  handleAddProject() {
    const projectName = document.getElementById("projectName").value;
    const projectIcon = "📁";

    if (projectName) {
      // Create new project button
      const newProjectButton = document.createElement("button");
      newProjectButton.className = "nav-item";
      newProjectButton.setAttribute(
        "data-section",
        `project-${projectName.toLowerCase()}`
      );

      const iconSpan = document.createElement("span");
      iconSpan.className = "nav-icon";
      iconSpan.textContent = projectIcon;

      const textSpan = document.createElement("span");
      textSpan.className = "nav-text";
      textSpan.textContent = projectName;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "project-delete";
      deleteBtn.textContent = "🗑️";
      deleteBtn.title = "Delete Project";

      newProjectButton.appendChild(iconSpan);
      newProjectButton.appendChild(textSpan);
      newProjectButton.appendChild(deleteBtn);

      // Insert before the Add Project button
      const addProjectButton = this.projectsSection.querySelector(
        ".add-project-button"
      );
      this.projectsSection.insertBefore(newProjectButton, addProjectButton);

      // Clear form and close modal
      this.closeModal();

      // Show success message
      this.showSuccessMessage("Project added successfully!");
    }
  }

  handleDeleteProject(projectItem, projectName) {
    if (
      confirm(
        `Are you sure you want to delete the project "${projectName}"? This will remove all tasks associated with this project.`
      )
    ) {
      // Remove the project button
      projectItem.remove();

      // Remove tasks associated with this project
      const tasksList = document.querySelector(".tasks-list");
      const tasks = tasksList.querySelectorAll(".task-item");
      tasks.forEach((task) => {
        if (task.getAttribute("data-project") === projectName.toLowerCase()) {
          task.remove();
        }
      });

      // Show success message
      this.showSuccessMessage("Project deleted successfully!");
    }
  }

  showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = message;
    document.body.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
  }
}
