document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addButton");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Add task on button click
    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    });

    // Add task on Enter key press
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
                taskInput.value = "";
            } else {
                alert("Please enter a task.");
            }
        }
    });

    // Function to add a task to DOM and Local Storage
    function addTask(taskText, save = true) {
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "remove";
        removeBtn.className = "remove-btn";

        // Remove task from DOM and Local Storage on button click
        removeBtn.addEventListener("click", () => {
            listItem.remove();
            removeTaskFromStorage(taskText);
        });

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Save task to Local Storage if not loading existing tasks
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false to prevent double saving
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});
