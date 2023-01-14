const BASE_URL = 'http://localhost:3000'

// Startup
window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('todos').addEventListener('click', getTodos)
    getTodos()
})

function getTodos() {
    let main = document.getElementById('main')
    main.innerHTML = ''
    fetch(BASE_URL + '/todos')
    .then (res => res.json())
    .then(todos => {
        todos.map(todo => {
        // console.log(todos)
        main.innerHTML += `
        <li>
            <a href='#' data-id='${todo.id}'>${todo.description}</a>
            - ${todo.completed ? 'Completed' : 'Not Completed'}
        </li>
        `
        })
    attachClicksToLinks()
    })
}

function attachClicksToLinks() {
    const todos = document.querySelectorAll('li a')
    for (const todo of todos) {
        todo.addEventListener('click', displayTodo)
    }
}

function displayTodo(e) {
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ''
    fetch(BASE_URL + `/todo/${id}`)
    .then(res => res.json())
    .then(data => {
        main.innerHTML = `
        <h3>${todo.description}</h3>
        <hr>
        <br>
        <p>${todo.completed ? 'Completed' : 'Not Completed'}</p>
        `
    })
}


