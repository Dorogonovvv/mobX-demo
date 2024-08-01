import { observer } from "mobx-react-lite";
import { ObservableTodoStore, ToDo } from "./todo-store";

export const TodoList = observer(({store}: {store: ObservableTodoStore}) => {
    const onNewTodo = () => {
      store.addTodo(prompt('Enter a new todo:','coffee plz') as string);
    }
  
    return (
      <div>
        { store.report }
        <ul>
          { store.todos.map(
            (todo, idx) => <TodoView todo={ todo } key={ idx } />
          ) }
        </ul>
        { store.pendingRequests > 0 ? <span>Loading...</span> : null }
        <button onClick={ onNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>
        {/* <RenderCounter /> */}
      </div>
    );
  })
  
  const TodoView = observer(({todo}: {todo: ToDo}) => {
    const onToggleCompleted = () => {
      todo.completed = !todo.completed;
    }
  
    const onRename = () => {
      todo.task = prompt('Task name', todo.task) || todo.task;
    }
  
    return (
      <li onDoubleClick={ onRename }>
        <input
          type='checkbox'
          checked={ todo.completed }
          onChange={ onToggleCompleted }
          className="mr-2"
        />
        { todo.task }
        { todo.assignee
          ? <small>{ todo.assignee.name }</small>
          : null
        }
        {/* <RenderCounter /> */}
      </li>
    );
  })