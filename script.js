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
