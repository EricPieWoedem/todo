import "./styles.css";
import { TodoList } from "./js/models/TodoList.js";
import { TaskUI } from "./js/ui/TaskUI.js";
import { ProjectUI } from "./js/ui/ProjectUI.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Initialize the todo list
const todoList = new TodoList();

// Initialize the UI components
const taskUI = new TaskUI(todoList);
const projectUI = new ProjectUI(todoList);

// DOM Elements
const sidebar = document.querySelector(".sidebar");
const closeSidebarBtn = document.querySelector(".close-sidebar");
const sectionTitle = document.querySelector(".section-title");
const addTaskButton = document.querySelector(".add-task-button");
const addProjectButton = document.querySelector(".add-project-button");

// Initialize date picker
const dateInput = document.getElementById("taskDate");
flatpickr(dateInput, {
  position: "auto",
  positionElement: dateInput,
  appendTo: document.body,
  static: true,
});

// Event Listeners
closeSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Use event delegation for navigation items
document.querySelector(".sidebar-nav").addEventListener("click", (e) => {
  const navItem = e.target.closest(".nav-item");
  if (!navItem) return;

  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Add active class to clicked item
  navItem.classList.add("active");

  // Update section title
  const section = navItem.getAttribute("data-section");
  if (section) {
    sectionTitle.textContent = section
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
});

// Project Management
addProjectButton.addEventListener("click", () => {
  projectUI.openModal();
});

// Task Management
addTaskButton.addEventListener("click", () => {
  taskUI.openModal();
});

// Initialize the app
console.log("TaskMaster app initialized");
