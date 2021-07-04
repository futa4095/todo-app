const TodoApp = {
  data () {
    return {
      newTodo: '',
      newPeriod: '',
      todos: JSON.parse(localStorage.getItem('todos')) ?? [],
      nextId: Number(localStorage.getItem('nextId')) ?? 0
    }
  },
  computed: {
    isAddButtonDisabled: vm => vm.newTodo.length === 0
  },
  methods: {
    create () {
      this.todos.push({ id: this.nextId++, text: this.newTodo, period: this.newPeriod, editing: false, completed: false })
      this.save()
      this.newTodo = ''
      this.newPeriod = ''
    },
    edit (id) {
      const todo = this.todos.find(todo => todo.id === id)
      todo.editing = true
    },
    update (id) {
      const todo = this.todos.find(todo => todo.id === id)
      todo.editing = false
      this.save()
    },
    deleteItem (id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.save()
    },
    save () {
      localStorage.setItem('todos', JSON.stringify(this.todos))
      localStorage.setItem('nextId', String(this.nextId))
    }
  }
}

Vue.createApp(TodoApp).mount('#todo-app')
