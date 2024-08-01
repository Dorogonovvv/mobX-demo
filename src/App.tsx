import React from "react";
import { autorun, trace, getDependencyTree } from "mobx";
import { observer } from "mobx-react-lite";

import logo from "./logo.svg";
import "./App.css";
import { TimerView, myTimer } from "./Timer";
import { CounterView, myCounter } from "./Counter";
import { TodoList } from "./ToDo";
import { observableTodoStore } from "./todo-store";

const App = observer(() => {
  console.log("App rendered");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <TimerView timer={myTimer} />
        <CounterView counter={myCounter} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React, the counter is {myCounter.count} and the timer is{" "}
          {myTimer.secondsPassed}
        </a>
        <div className="my-6">
          <TodoList store={observableTodoStore} />
        </div>
      </header>
    </div>
  );
});

export default App;

const disposer = autorun(() => {
  console.log("[autorun] Passed seconds: ", myTimer.secondsPassed);
  trace();
});

console.log(getDependencyTree(disposer));
