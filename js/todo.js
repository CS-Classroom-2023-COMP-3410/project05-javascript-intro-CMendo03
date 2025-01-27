const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('#filter-buttons button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks based on filter
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    tasks
        .filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        })
        .forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.draggable = true;

            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span data-index="${index}" contenteditable="true">${task.text}</span>
                <button data-index="${index}">Delete</button>
            `;

            // Event listeners for drag-and-drop
            taskItem.addEventListener('dragstart', () => {
                taskItem.classList.add('dragging');
            });
            taskItem.addEventListener('dragend', () => {
                taskItem.classList.remove('dragging');
                saveTasks();
            });

            taskList.appendChild(taskItem);
        });

    setupDragAndDrop();
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        saveTasks();
        taskInput.value = '';
        renderTasks();
    }
}

// Update task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit task text
function editTask(index, newText) {
    tasks[index].text = newText;
    saveTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks
function filterTasks(filter) {
    filterButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    renderTasks(filter);
}

// Set up drag-and-drop functionality
function setupDragAndDrop() {
    const taskItems = taskList.querySelectorAll('li');

    taskItems.forEach(item => {
        item.addEventListener('dragover', event => {
            event.preventDefault();
            const afterElement = getDragAfterElement(taskList, event.clientY);
            const dragging = document.querySelector('.dragging');
            if (afterElement == null) {
                taskList.appendChild(dragging);
            } else {
                taskList.insertBefore(dragging, afterElement);
            }
        });
    });
}

// Helper to find element position for drag-and-drop
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Event listeners
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') addTask();
});
taskList.addEventListener('change', event => {
    if (event.target.type === 'checkbox') {
        const index = event.target.dataset.index;
        toggleTaskCompletion(index);
    }
});
taskList.addEventListener('input', event => {
    if (event.target.tagName === 'SPAN') {
        const index = event.target.dataset.index;
        editTask(index, event.target.textContent.trim());
    }
});
taskList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const index = event.target.dataset.index;
        deleteTask(index);
    }
});
filterButtons.forEach(button => {
    button.addEventListener('click', () => filterTasks(button.dataset.filter));
});

// Initialize app
renderTasks();
