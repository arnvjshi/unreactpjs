class Component {
    protected state: Record<string, any>;
    protected props: Record<string, any>;
    protected isMounted: boolean;

    constructor() {
        this.state = {};
        this.props = {};
        this.isMounted = false;
    }

    setState(newState: Record<string, any>) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    getState() {
        return this.state;
    }

    setProps(newProps: Record<string, any>) {
        this.props = { ...this.props, ...newProps };
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

export default Component;

// Create component function for functional components
export function createComponent(renderFunction: (props?: any) => HTMLElement) {
    return (props?: any) => {
        return renderFunction(props);
    };
}
