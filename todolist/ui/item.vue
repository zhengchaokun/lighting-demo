<template>
    <li class="todo"
        :class="{completed: todo.completed, editing: todo == editedTodo}">
        <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" title="">
            <label @dblclick="editTodo(todo)">{{todo.title}}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo"
               @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" title="">
    </li>
</template>

<script>
    export default {
        data:function () {
            return {
                editedTodo: null,
            }
        },
        props:['todo'],
        methods:{
            removeTodo: function (todo) {
                this.$emit('remove',todo)
            },

            editTodo: function (todo) {
                this.beforeEditCache = todo.title;
                this.editedTodo = todo;
            },

            doneEdit: function (todo) {
                if (!this.editedTodo) {
                    return;
                }
                this.editedTodo = null;
                todo.title = todo.title.trim();
                if (!todo.title) {
                    this.removeTodo(todo);
                }
            },

            cancelEdit: function (todo) {
                this.editedTodo = null;
                todo.title = this.beforeEditCache;
            },
        },

        directives: {
            'todo-focus': function (el, binding) {
                if (binding.value) {
                    el.focus();
                }
            }
        }
    }
</script>