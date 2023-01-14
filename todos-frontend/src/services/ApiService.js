class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:3000'
    }
 
   async fetchTodos() {
        let res = await fetch(this.baseURL + '/todos')
        let data = await res.json()
        return data        
   }

    async fetchTodo(id) {
        let res = await fetch(this.baseURL + `/todos/${id}`)
        let data = await res.json()
        return data
    }   

    async fetchCreateTodo(todoData) {
        let configObj = {
            method: 'POST',
            body: JSON.stringify(todoData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/todos`, configObj)
        let data = await res.json()
        return data
    }

    async fetchRemoveTodo(id) {
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/todos/${id}`, configObj)
    }
}
 