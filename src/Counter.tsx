import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class Counter {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseCount() {
    this.count += 1;
  }
  decreaseCount() {
    this.count -= 1;
  }
}

export const myCounter = new Counter();

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
export const CounterView = observer(({ counter }: { counter: Counter }) => {
  console.log("Counter rendered");
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={() => counter.decreaseCount()}
      >
        -
      </button>
      <span className="text-xl font-semibold text-gray-700">
        Count: {counter.count}
      </span>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={() => counter.increaseCount()}
      >
        +
      </button>
    </div>
  );
});
