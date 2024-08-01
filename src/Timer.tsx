import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

export const myTimer = new Timer()

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
export const TimerView = observer(({ timer }: { timer: Timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

setInterval(() => {
    myTimer.increaseTimer()
}, 1000)