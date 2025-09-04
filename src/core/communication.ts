export class Communication {
    private parent: any;
    private children: any[] = [];

    constructor(parent: any) {
        this.parent = parent;
    }

    addChild(child: any) {
        this.children.push(child);
        child.setParent(this);
    }

    sendToParent(data: any) {
        if (this.parent) {
            this.parent.receiveFromChild(data);
        }
    }

    sendToChild(childIndex: number, data: any) {
        if (this.children[childIndex]) {
            this.children[childIndex].receiveFromParent(data);
        }
    }

    receiveFromChild(data: any) {
        // Handle data received from child
    }

    receiveFromParent(data: any) {
        // Handle data received from parent
    }
}
