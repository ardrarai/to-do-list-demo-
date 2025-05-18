// Get HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const allTasksList = document.getElementById('allTasksList');
const pendingTasksList = document.getElementById('pendingTasksList');
const completedTasksList = document.getElementById('completedTasksList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add task event listener
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  // Make sure the input is not empty
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveToLocalStorage();
  renderTasks();
  taskInput.value = ''; // Clear input field
});

// Render tasks based on their state (pending/completed)
function renderTasks() {
  // Clear existing task lists
  allTasksList.innerHTML = '';
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="delete-btn">❌</button>
    `;
    
    // Delete task event
    const deleteButton = taskItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1); // Remove task from array
      saveToLocalStorage(); // Save updated tasks
      renderTasks(); // Re-render tasks
    });

    // Toggle task completion
    taskItem.addEventListener('click', () => {
      task.completed = !task.completed;
      saveToLocalStorage(); // Save updated tasks
      renderTasks(); // Re-render tasks
    });

    // Add task to the correct list based on completion status
    if (task.completed) {
      taskItem.classList.add('completed');
      completedTasksList.appendChild(taskItem);
    } else {
      pendingTasksList.appendChild(taskItem);
    }

    allTasksList.appendChild(taskItem); // Add to "All Tasks" list
  });
}

// Save tasks to localStorage
function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Switch tabs
document.getElementById('allTasksTab').addEventListener('click', () => {
  showTab(allTasksList);
});
document.getElementById('pendingTasksTab').addEventListener('click', () => {
  showTab(pendingTasksList);
});
document.getElementById('completedTasksTab').addEventListener('click', () => {
  showTab(completedTasksList);
});

// Function to show only the selected tab
function showTab(tabToShow) {
  const tabs = [allTasksList, pendingTasksList, completedTasksList];
  tabs.forEach(tab => tab.style.display = 'none');
  tabToShow.style.display = 'block';

  // Toggle active tab button
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.classList.remove('active');
  });
  const activeTabButton = document.querySelector(`#${tabToShow.id.replace('List', 'Tab')}`);
  activeTabButton.classList.add('active');
}

// Initially show all tasks
showTab(allTasksList);

// Initial task rendering from localStorage
renderTasks();
