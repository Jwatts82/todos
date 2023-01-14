class Todo {
    constructor(data){
        this.id = data.id
        this.description = data.description
        this.completed = data.completed
        this.items = data.items
    }
    render() {
        return `
        <li>
            <a href='#' data-id='${this.id}'>${this.description}</a>
            - ${this.completed ? 'Completed' : 'Not Completed'}
        </li>
        `
    }

    renderTodo() {
      return `
        <h3>${this.description}</h3>
        <hr>
        <br>
        <p>${this.completed ? "Completed" : "Not Completed"}</p>
        <button id='delete-todo' data-id='${this.id}'>Delete</button>
      `
    }


}