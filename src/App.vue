<template>
  <AppHeader />
  <main>
    <AddTodo @AddNewTodo="AddTodo" />
    <ul class="todos">
      <Todo
        v-for="(item, index) in getTodo"
        :key="item.id"
        :todo="item"
        @Deleted="deleteTodo"
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

<script>
import AppHeader from "./components/AppHeader.vue";
import AddTodo from "./components/AddTodo.vue";
import AppFooter from "./components/AppFooter.vue";
import Todo from "./components/Todo.vue";

export default {
  data() {
    return {
      todos: [],
      dragging: -1,
      activeTab: "all",
    };
  },
  name: "App",
  components: {
    AppHeader,
    AddTodo,
    AppFooter,
    Todo,
  },
  computed: {
    getActiveTodoCount() {
      return this.todos.filter((f) => f.isComplete == false).length;
    },
    getTodo() {
      switch (this.activeTab) {
        case "all":
          return this.todos;
        case "active":
          return this.todos.filter((f) => f.isComplete == false);
        case "completed":
          return this.todos.filter((f) => f.isComplete == true);
        default:
          return this.todos;
      }
    },
  },
  methods: {
    AddTodo(title) {
      const id = Math.random().toString(16).slice(2);
      const todo = {
        id,
        title,
        isComplete: false,
      };
      this.todos.push(todo);
      this.$toast.success("عملیات با موفقیت انجام شد");
    },
    deleteTodo(id) {
      const todo = this.todos.find((f) => f.id == id);
      this.todos = this.todos.filter((f) => f.id !== id);
      this.$toast.error(`${todo.title} حذف شد`);
    },
    changeTodoStatus(id, status) {
      var newTodos = [...this.todos];
      var selectedTodo = newTodos.find((f) => f.id === id);
      selectedTodo.isComplete = status;
      this.todos = newTodos;
    },
    deleteCompleted() {
      if (confirm("آیا از انجام مطمئنی ؟ ")) {
        var newTodos = [...this.todos];
        newTodos = newTodos.filter((f) => f.isComplete === false);
        this.todos = newTodos;
      }
    },
    dragStart(index) {
      this.dragging = index;
    },
    drop(index) {
      var newElement = this.todos.splice(this.dragging, 1)[0];
      this.todos.splice(index, 0, newElement);
    },
    changeTab(tab) {
      console.log(this.activeTab);
      this.activeTab = tab;
    },
  },
};
</script>

<style>
</style>
