import { makeObservable, observable, computed, action, autorun } from "mobx";

export type ToDo = {
  task: string;
  completed: boolean;
  assignee?: any;
};

export class ObservableTodoStore {
  todos: Array<ToDo> = [];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
    });
    autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed === true).length;
  }

  get report() {
    if (this.todos.length === 0) return "<none>";
    const nextTodo = this.todos.find((todo) => todo.completed === false);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task: string) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null,
    });
  }
}

export const observableTodoStore = new ObservableTodoStore();

observableTodoStore.addTodo("read MobX tutorial");
observableTodoStore.addTodo("try MobX");
observableTodoStore.todos[0].completed = true;
observableTodoStore.todos[1].task = "try MobX in own project";
observableTodoStore.todos[0].task = "grok MobX tutorial";
