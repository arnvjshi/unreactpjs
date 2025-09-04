"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Communication = void 0;
class Communication {
    constructor(parent) {
        this.children = [];
        this.parent = parent;
    }
    addChild(child) {
        this.children.push(child);
        child.setParent(this);
    }
    sendToParent(data) {
        if (this.parent) {
            this.parent.receiveFromChild(data);
        }
    }
    sendToChild(childIndex, data) {
        if (this.children[childIndex]) {
            this.children[childIndex].receiveFromParent(data);
        }
    }
    receiveFromChild(data) {
        // Handle data received from child
    }
    receiveFromParent(data) {
        // Handle data received from parent
    }
}
exports.Communication = Communication;
