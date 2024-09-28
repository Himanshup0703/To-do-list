// script.js

// Select the form and the task list element
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Event listener for adding tasks
taskForm.addEventListener('submit', addTask);

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task
function addTask(e) {
    e.preventDefault();  // Prevent the form from submitting

    const taskText = taskInput.value;  // Get the input value

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new task element
    const task = document.createElement('li');
    task.textContent = taskText;

    // Add the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    task.appendChild(deleteBtn);

    // Add task to the list
    taskList.appendChild(task);

    // Save task to localStorage
    saveTaskToLocalStorage(taskText);

    // Clear the input field
    taskInput.value = '';
}

// Event listener for marking tasks as complete or deleting tasks
taskList.addEventListener('click', handleTaskClick);

// Function to handle marking tasks complete or deleting them
function handleTaskClick(e) {
    if (e.target.classList.contains('delete-btn')) {
        const task = e.target.parentElement;
        removeTaskFromLocalStorage(task.textContent.replace('Delete', '').trim());
        task.remove();  // Delete task
    } else {
        e.target.classList.toggle('completed');  // Mark as complete/incomplete
    }
}

// Save a new task to localStorage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();

    tasks.forEach(taskText => {
        const task = document.createElement('li');
        task.textContent = taskText;

        // Add the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        task.appendChild(deleteBtn);

        taskList.appendChild(task);
    });
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
