<template>
  <AppHeader />
  <main>
    <AddTodo @AddNewTodo="handleAddTodo" />
    <ul class="todos">
      <Todo
        v-for="(item, index) in getTodo"
        :key="item.id"
        :todo="item"
        @onDeleted="deleteTodo"
        @changeStatus="changeTodoStatus"
        @dragstart="dragStart(index)"
        @dragover.prevent
        @drop="drop(index)"
      />
    </ul>
    <div class="card stat">
      <p class="corner">
        <span id="items-left">{{ getActiveTodoCount }}</span> مورد باقی مانده
      </p>
      <div class="filter">
        <button
          @click="changeTab('all')"
          :class="{ on: activeTab == 'all' }"
          id="all"
        >
          همه
        </button>
        <button
          @click="changeTab('active')"
          :class="{ on: activeTab == 'active' }"
          id="active"
        >
          فعال
        </button>
        <button
          @click="changeTab('completed')"
          :class="{ on: activeTab == 'completed' }"
          id="completed"
        >
          تکمیل
        </button>
      </div>
      <div class="corner">
        <button id="clear-completed" @click="deleteCompleted">
          حذف تکمیل شده ها
        </button>
      </div>
    </div>
  </main>
  <AppFooter />
</template>

<script setup>
import { useToast } from "vue-toastification";
import AppHeader from "./components/AppHeader.vue";
import AddTodo from "./components/AddTodo.vue";
import AppFooter from "./components/AppFooter.vue";
import Todo from "./components/Todo.vue";

import { ref, computed } from "vue";

const toast = useToast();
var todos = ref([]);
const dragging = ref(-1);
const activeTab = ref("all");

const getActiveTodoCount = computed(() => {
  return todos.value.filter((f) => f.isComplete == false).length;
});

const getTodo = computed(() => {
  switch (activeTab.value) {
    case "all":
      return todos.value;
    case "active":
      return todos.value.filter((f) => f.isComplete == false);
    case "completed":
      return todos.value.filter((f) => f.isComplete == true);
    default:
      return todos;
  }
});

function handleAddTodo(title) {
  if (!title) {
    toast.error("عنوان را وارد کنید");
    return;
  }
  const id = Math.random().toString(16).slice(2);
  const todo = {
    id,
    title,
    isComplete: false,
  };
  todos.value.push(todo);
  toast.success("عملیات با موفقیت انجام شد");
}
function deleteTodo(id) {
  const todo = todos.value.find((f) => f.id == id);
  todos.value = todos.value.filter((f) => f.id !== id);
  toast.error(`${todo.title} حذف شد`);
}
function changeTodoStatus(id, status) {
  var newTodos = [...todos.value];
  var selectedTodo = newTodos.find((f) => f.id === id);
  selectedTodo.isComplete = status;
  todos.value = newTodos;
}
function deleteCompleted() {
  if (confirm("آیا از انجام مطمئنی ؟ ")) {
    var newTodos = [...todos.value];
    newTodos = newTodos.filter((f) => f.isComplete === false);
    todos.value = newTodos;
  }
}
function dragStart(index) {
  dragging.value = index;
}
function drop(index) {
  var newElement = todos.value.splice(dragging.value, 1)[0];
  todos.value.splice(index, 0, newElement);
}
function changeTab(tab) {
  activeTab.value = tab;
}
</script>

<style>
</style>
