// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task before adding!");
            return;
        }

        // Create a new <li> element and set its text
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a "Remove" button and set its properties
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Assign an onclick event to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append the button to the <li>, then append the <li> to the list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the input field for the next entry
        taskInput.value = "";
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener for pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
// script.js
// To-Do List with Local Storage persistence

document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks array from localStorage (or start with empty array)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save the current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a DOM element for a task and append it to the list
    function createTaskElement(taskText) {
        // Create list item
        const listItem = document.createElement('li');

        // Add the task text
        const textNode = document.createTextNode(taskText);
        listItem.appendChild(textNode);

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When clicked, remove the task from DOM and from the stored tasks array
        removeButton.addEventListener('click', function() {
            // Remove from DOM
            taskList.removeChild(listItem);

            // Remove first matching occurrence from tasks array and save
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        // Append the button to the list item and the item to the list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    // Load tasks from the tasks array into the DOM
    function loadTasks() {
        // Clear current list in DOM (in case)
        taskList.innerHTML = '';

        // Create elements for all stored tasks
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }

    // Add a new task (if called without args, read from input)
    function addTask(taskTextArg) {
        // Determine task text (either provided or from input)
        const taskText = (typeof taskTextArg === 'string') ? taskTextArg : taskInput.value.trim();

        // Validate
        if (taskText === '') {
            alert('Please enter a task before adding!');
            return;
        }

        // Update in-memory array and save to localStorage
        tasks.push(taskText);
        saveTasks();

        // Create DOM element for the new task
        createTaskElement(taskText);

        // Clear input
        taskInput.value = '';
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Event listener for pressing Enter in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize the UI by loading tasks from localStorage
    loadTasks();

});
