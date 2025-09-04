"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = void 0;
class Component {
    constructor() {
        this.state = {};
        this.props = {};
        this.isMounted = false;
    }
    setState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        this.render();
    }
    getState() {
        return this.state;
    }
    setProps(newProps) {
        this.props = Object.assign(Object.assign({}, this.props), newProps);
        this.render();
    }
    getProps() {
        return this.props;
    }
    componentDidMount() {
        // Lifecycle method called after the component is mounted
    }
    componentDidUpdate() {
        // Lifecycle method called after the component is updated
    }
    componentWillUnmount() {
        // Lifecycle method called before the component is unmounted
    }
    render() {
        // This method should be overridden by subclasses to render the component
        throw new Error("Render method not implemented");
    }
}
exports.default = Component;
// Create component function for functional components
function createComponent(renderFunction) {
    return (props) => {
        return renderFunction(props);
    };
}
exports.createComponent = createComponent;
