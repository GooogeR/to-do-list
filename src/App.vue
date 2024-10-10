<template>
  <div id="app">
    <h1>Список задач</h1>
    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Добавить новую задачу" />
      <button type="submit">Добавить</button>
    </form>

    <ul>
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <span
          class="task-text"
          :class="{ completed: task.completed }"
          @click="toggleTask(index)"
        >
          {{ task.text }}
        </span>
        <div class="task-actions">
          <button @click="editTaskMode(index)">Изменить</button>
          <button @click="removeTask(index)">Удалить</button>
        </div>
        <input
          v-if="editMode === index"
          v-model="editText"
          @blur="editTask(index)"
          class="edit-input"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from './stores/todoStore'

const store = useTodoStore()
const newTask = ref('')
const editMode = ref(null)
const editText = ref('')

const addTask = () => {
  if (newTask.value) {
    store.addTask(newTask.value)
    newTask.value = ''
  }
}

const removeTask = (index) => store.removeTask(index)

const toggleTask = (index) => store.toggleTask(index)

const editTaskMode = (index) => {
  editMode.value = index
  editText.value = store.tasks[index].text
}

const editTask = (index) => {
  if (editText.value) {
    store.editTask(index, editText.value)
    editMode.value = null
  }
}

const tasks = store.tasks
</script>

<style>
ul {
  padding: 0;
  list-style: none;
}

input {
  width: 300px; 
  padding: 10px;
  margin-right: 20px;
  text-align: center;
}

.task-item {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 10px;
}


.task-text {
  flex-grow: 1;
  margin-right: 20px;
  cursor: pointer;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.edit-input {
  margin-left: 10px;
}
</style>
