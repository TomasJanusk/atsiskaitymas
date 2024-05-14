
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoTable = document.querySelector('#todo-table');
const todoList = document.querySelector('#todo-list');

document.addEventListener('DOMContentLoaded', function () {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (taskText) {
        addTaskToDOM(taskText);
    });
});
function addTaskToDOM(taskText) {
    const taskRow = document.createElement('tr');
    taskRow.innerHTML = `
        <td>${taskText}</td>
        <td>TODO</td>
        <td>Open</td>
        <td><button class="delete-button">Ištrinti</button></td>`;
    todoList.appendChild(taskRow);
}
function removeTaskFromDOM(taskRow) {
    taskRow.remove();
}
function addTodo(event) {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTodoToLocalStorage(taskText); 
        todoInput.value = ''; 
    }
}
function saveTodoToLocalStorage(taskText) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const taskRow = event.target.parentElement.parentElement;
        const taskText = taskRow.firstElementChild.textContent;
        removeTaskFromDOM(taskRow);
        removeTaskFromLocalStorage(taskText);
    }
});
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(function (task) {
        return task !== taskText;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
