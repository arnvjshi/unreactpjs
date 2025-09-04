# unreact Framework

unreact is a modern JavaScript framework that combines the best features of React and Angular, providing a powerful and flexible environment for building user interfaces. It introduces a unique approach to state management and component communication, allowing for seamless parent-child interactions and a more intuitive development experience.

## Features

- **State Management**: Centralized state management with a simple API for getting, setting, and subscribing to state changes.
- **Component Lifecycle**: A robust lifecycle management system for components, enabling developers to hook into various stages of a component's life.
- **Bidirectional Communication**: Facilitates parent-child communication, allowing child components to send data back to their parents, enhancing the interactivity of applications.
- **Modular Design**: Extensible architecture that allows developers to create and integrate custom modules easily.
- **Type Safety**: Built with TypeScript, ensuring type safety and better tooling support.

## Installation

To install unreact, you can use npm:

```bash
npm install unreact
```

## Usage

Here’s a simple example of how to create a component using unreact:

```typescript
import { Component } from 'unreact';

class MyComponent extends Component {
    constructor() {
        super();
        this.state = { count: 0 };
    }

    increment() {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return `<div>
                    <p>Count: ${this.state.count}</p>
                    <button onclick="${this.increment.bind(this)}">Increment</button>
                </div>`;
    }
}
```

## API Reference

### State

- `getState()`: Retrieves the current state.
- `setState(newState)`: Updates the state and triggers re-renders.
- `subscribe(callback)`: Subscribes to state changes.

### Component

- `render()`: Renders the component.
- `componentDidMount()`: Lifecycle method called after the component is mounted.
- `componentWillUnmount()`: Lifecycle method called before the component is unmounted.

### Communication

- `sendToParent(data)`: Sends data from child to parent component.
- `receiveFromChild(callback)`: Sets up a listener for data from child components.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.