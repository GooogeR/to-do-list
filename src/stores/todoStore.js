import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push({ text: task, completed: false })
      this.saveToLocalStorage()
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
      this.saveToLocalStorage()
    },
    toggleTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed
      this.saveToLocalStorage()
    },
    editTask(index, newText) {
      this.tasks[index].text = newText
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
})
