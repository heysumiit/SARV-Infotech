const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");

        const taskName = document.createElement("span");

        taskName.textContent = task.text;
        taskName.className = "task-name";

        if (task.completed) {
            taskName.classList.add("completed");
        }

        const buttonBox = document.createElement("div");

        buttonBox.className = "button-box";

        // Complete button
        const completeBtn = document.createElement("button");

        completeBtn.textContent = "✓";
        completeBtn.className = "complete-btn";

        completeBtn.addEventListener("click", function () {

            task.completed = !task.completed;

            saveTasks();
            displayTasks();
        });

        // Edit button
        const editBtn = document.createElement("button");

        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function () {

            const input = document.createElement("input");

            input.type = "text";
            input.value = task.text;
            input.className = "edit-input";

            li.replaceChild(input, taskName);

            editBtn.textContent = "Save";

            input.focus();

            editBtn.onclick = function () {

                const newText = input.value.trim();

                if (newText === "") {
                    alert("Task cannot be empty.");
                    input.focus();
                    return;
                }

                task.text = newText;

                saveTasks();
                displayTasks();
            };

            input.addEventListener("keydown", function (event) {

                if (event.key === "Enter") {
                    editBtn.click();
                }

            });
        });

        // Delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {

            const confirmDelete = confirm(
                "Are you sure you want to delete this task?"
            );

            if (confirmDelete) {

                tasks = tasks.filter(function (item) {
                    return item.id !== task.id;
                });

                saveTasks();
                displayTasks();
            }
        });

        buttonBox.appendChild(completeBtn);
        buttonBox.appendChild(editBtn);
        buttonBox.appendChild(deleteBtn);

        li.appendChild(taskName);
        li.appendChild(buttonBox);

        taskList.appendChild(li);
    });
}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}