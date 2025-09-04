"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }
    getState() {
        return this.state;
    }
    setState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        this.notifyListeners();
    }
    subscribe(listener) {
        this.listeners.push(listener);
        listener(this.state); // Call listener with the current state
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }
}
exports.default = State;
