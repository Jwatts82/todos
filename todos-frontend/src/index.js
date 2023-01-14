const apiService = new ApiService()
let main = document.getElementById('main')

const init = () => {
    bindEventListeners()
    renderTodos()
}

function bindEventListeners() {
    document.getElementById('todos').addEventListener('click', renderTodos)
    document.getElementById('todo-form').addEventListener('click', displayCreateForm)
}

async function renderTodos() {
    const todos = await apiService.fetchTodos()
    main.innerHTML = ''
    todos.map(todo => {
        const newTodo = new Todo(todo)
        main.innerHTML += newTodo.render()
    })
    attachClicksToLinks()
}

function attachClicksToLinks() {
    const todos = document.querySelectorAll('li a')
    for (const todo of todos) {
        todo.addEventListener('click', displayTodo)
    }
}

async function displayTodo(e) {
    console.log(e.target)
    let id = e.target.dataset.id

    const data = await apiService.fetchTodo(id)
    const todo = new Todo(data)
    main.innerHTML = todo.renderTodo()
    document.getElementById('delete-todo').addEventListener('click', removeTodo)
}

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
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createTodo)
}

function clearForm() {
    let formDiv = document.querySelector('#new-todo-form') 
    formDiv.innerHTML = ""
}

async function createTodo(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let todo = {
        description: e.target.querySelector("#description").value,
        completed: e.target.querySelector("#completed").checked
    }
   
    let data = await apiService.fetchCreateTodo(todo)
    let newTodo = new Todo(data) 
    main.innerHTML += newTodo.render()
        attachClicksToLinks()
        clearForm()
}

async function removeTodo(event) {
    let id = event.target.dataset.id
    const data = await apiService.fetchRemoveTodo(id)
    .then(data => {
        renderTodos()
    })
}

init()