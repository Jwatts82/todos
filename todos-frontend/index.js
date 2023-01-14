const BASE_URL = 'http://localhost:3000'

// Startup
window.addEventListener('DOMContentLoaded', () => {
    // show form 
    document.getElementById('todo-form').addEventListener('click', displayCreateForm)
    // show index view button
    document.getElementById('todos').addEventListener('click', getTodos)
    getTodos()
})

// writing the callback function for the form
// New Route
function displayCreateForm() {
    let formDiv = document.querySelector('#new-todo-form')
    let html = `
        <form>
            <label>Description</label>
            <input type='text' id='description'></input>
            <label>Complete</label>
            <input type='checkbox' id='completed'></input>
            <input type='submit'></input>
        </form>
    `
    // add to the document
    formDiv.innerHTML = html
    // best practice to add submit to the form and not the submit button
    document.querySelector('form').addEventListener('submit', createTodo)
}

// helper funcction to clear off page
function clearForm() {
    let formDiv = document.querySelector('#new-todo-form') 
    formDiv.innerHTML = ""
}

// Create Route
function createTodo(e) {
    // form submission prevent the send post (hijacking event)
    e.preventDefault()
    let main = document.getElementById('main')
    // console.log(e)
    let todo = {
        description: e.target.querySelector("#description").value,
        completed: e.target.querySelector("#completed").checked
    }
    // to send it to the backend to keep
    // what we are sending with the fetch
    let configObj = {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(BASE_URL + '/todos', configObj)
    .then (res => res.json())
    .then (todo => {
        // add the todo to the list
        main.innerHTML += `
        <li>
            <a href='#' data-id='${todo.id}'>${todo.description}</a>
            - ${todo.completed ? 'Completed' : 'Not Completed'}
        </li>
        `
        // besides adding to inner html
        attachClicksToLinks()
        clearForm()
        }
    ) 
}


// Index View
function getTodos() {
    let main = document.getElementById('main')
    main.innerHTML = ''
    // comment out below 2 lines to show async example
    fetch(BASE_URL + '/todos') 
    .then (res => res.json())
    // fetchTodos()
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

// async replacing function cleaner example move into a service class
// async function fetchTodos() {
//     let res = await fetch(BASE_URL + '/todos')
//     let data = await res.json()
//     return data
// }

function attachClicksToLinks() {
    const todos = document.querySelectorAll('li a')
    for (const todo of todos) {
        todo.addEventListener('click', displayTodo)
    }
}

// Show Route
function displayTodo(e) {
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ''
    fetch(BASE_URL + `/todos/${id}`)
    .then(res => res.json())
    .then(todo => {
        main.innerHTML = `
        <h3>${todo.description}</h3>
        <hr>
        <br>
        <p>${todo.completed ? 'Completed' : 'Not Completed'}</p>
        <button id='delete-todo' data-id='${todo.id}'>Delete</button>
        `
    })
}

