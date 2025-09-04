class State {
    private state: Record<string, any>;
    private listeners: Array<(state: Record<string, any>) => void>;

    constructor(initialState: Record<string, any> = {}) {
        this.state = initialState;
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    setState(newState: Record<string, any>) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    subscribe(listener: (state: Record<string, any>) => void) {
        this.listeners.push(listener);
        listener(this.state); // Call listener with the current state

        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

export default State;
