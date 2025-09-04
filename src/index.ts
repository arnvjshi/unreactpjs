import State from './core/state';
import Component, { createComponent } from './core/component';
import { Communication } from './core/communication';

class Unreact {
    private state: State;
    private communication: Communication;

    constructor() {
        this.state = new State();
        this.communication = new Communication(this);
    }

    public getState(): State {
        return this.state;
    }

    public getCommunication(): Communication {
        return this.communication;
    }
}

export default new Unreact();
export { createComponent };
