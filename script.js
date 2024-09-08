// To Do List App

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');  

let todos = [];

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const todoText = todoInput.value;

    if (todoText.trim() === '') {
        return;
    }

    const todo = {
        text: todoText,
        completed: false
    };

    todos.push(todo);

    saveTodos();

    renderTodo(todo);

    todoInput.value = '';

    todoInput.focus();

})

function renderTodo(todo) {
    const li = document.createElement('li');
    li.id = todo.id;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', function() {
        toggleTodo(todo.id);
        saveTodos();
    });
    li.appendChild(checkbox);
    const span = document.createElement('span');
    span.textContent = todo.text;   
    li.appendChild(span);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteTodo(todo.id);
        saveTodos();
        li.remove();
    });
    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

function toggleTodo(id) {
    const index = todos.findIndex(function(todo) {
        return todo.id === id;
    });
    todos[index].completed = !todos[index].completed;
}

function deleteTodo(id) {
    const index = todos.findIndex(function(todo) {
        return todo.id === id;
    });
    todos.splice(index, 1);
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}   

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        todos.forEach(function(todo) {
            renderTodo(todo);
        });
    }
}

loadTodos();
