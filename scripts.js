document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                ${task.title} - ${new Date(task.dateTime).toLocaleString()}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function checkReminders() {
        const now = new Date().getTime();
        tasks.forEach(task => {
            const taskTime = new Date(task.dateTime).getTime();
            if (taskTime <= now) {
                alert(`Reminder: ${task.title}`);
                tasks.splice(tasks.indexOf(task), 1);
                saveTasks();
                renderTasks();
            }
        });
    }

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskTitle = document.getElementById('taskTitle').value;
        const taskDateTime = document.getElementById('taskDateTime').value;
        tasks.push({ title: taskTitle, dateTime: taskDateTime });
        saveTasks();
        renderTasks();
        taskForm.reset();
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
    setInterval(checkReminders, 60000); // Check reminders every minute
});
