<template>
    <section class="todoapp" v-cloak>
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" autofocus autocomplete="off" placeholder="有什么要做的吗?" v-model="newTodo"
                   @keyup.enter="addTodo">
        </header>
        <section class="main" v-show="todos.length">
            <input class="toggle-all" type="checkbox" v-model="allDone" title="">
            <ul class="todo-list">
                <todo-item :todo="todo" @remove="removeTodo"  v-for="todo in filteredTodos"></todo-item>
            </ul>
        </section>
        <footer class="footer" v-show="todos.length">
				<span class="todo-count">
					<strong v-text="remaining"></strong> 任务待完成
				</span>
            <ul class="filters">
                <li><a href="javascript:void(0)" @click="visibility='all'" :class="{selected: visibility == 'all'}">全部
                </a></li>
                <li><a href="javascript:void(0)" @click="visibility='active'" :class="{selected: visibility == 'active'}">进行中</a></li>
                <li><a href="javascript:void(0)" @click="visibility='completed'" :class="{selected: visibility == 'completed'}">已完成</a></li>
            </ul>
            <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
                清除已完成
            </button>
        </footer>
    </section>
</template>
<script>
    import {todoStorage} from "../lib/store"

    import TodoItem from "../ui/item.vue";

    let filters = {
        all: function (todos) {
            return todos;
        },
        active: function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed;
            });
        },
        completed: function (todos) {
            return todos.filter(function (todo) {
                return todo.completed;
            });
        }
    };

    export default {
        data: function () {
            return {
                todos: todoStorage.fetch(),
                newTodo: '',
                visibility: 'all'
            }
        },
        components:{
            TodoItem
        },

        watch: {
            todos: {
                deep: true,
                handler: todoStorage.save
            }
        },

        computed: {
            filteredTodos: function () {
                return filters[this.visibility](this.todos);
            },
            remaining: function () {
                return filters.active(this.todos).length;
            },
            allDone: {
                get: function () {
                    return this.remaining === 0;
                },
                set: function (value) {
                    this.todos.forEach(function (todo) {
                        todo.completed = value;
                    });
                }
            }
        },

        methods: {
            addTodo: function () {
                let value = this.newTodo && this.newTodo.trim();
                if (!value) {
                    return;
                }
                this.todos.push({title: value, completed: false});
                this.newTodo = '';
            },

            removeCompleted: function () {
                this.todos = filters.active(this.todos);
            },

            removeTodo:function (todo) {
                let index = this.todos.indexOf(todo);
                this.todos.splice(index,1);
            }
        },
        afterShow:function (params) {
        }
    };
</script>
<style src="../css/todo.css"></style>
